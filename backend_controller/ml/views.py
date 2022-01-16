import pickle

from django.shortcuts import render
from api.permissions import isAdminUser, isAdminOrMemberUser, isMemberUser
from api.models import MasterDataset
from django.conf import settings
from django.views.decorators.csrf import (
    csrf_exempt
)
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async

from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404

from .serializers import ModelSerializers, KonsultasiSerializers, ResultSerializers, TrainingResultSerializers
from .models import MasterModel, MasterKonsultasi, MasterHasil, MasterTrainingResult
from .tasks import get_dataset, save_result, nb_pipeline, dt_pipeline, knn_pipeline, gb_pipeline
from .utils import convert_to__dict_graph

from sklearn.model_selection import KFold, cross_val_score
from sklearn.metrics import classification_report, accuracy_score
import pandas as pd
import numpy as np
import joblib
import os
import seaborn as sns
import matplotlib.pyplot as plt
sns.set_style('whitegrid')


User = get_user_model()


# Create your views here.
class MlModelView(viewsets.ModelViewSet):
    serializer_class = ModelSerializers
    queryset = MasterModel.objects.all()
    permission_classes = [isAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=['post'])
    def test_model(self, request):
        data = pd.read_excel(request.FILES.get('file'))
        y = data['name']
        x = np.array(data.drop('name', axis='columns'))
        query = self.get_queryset()
        for model in query:
            ml = pickle.load(model.path.open('rb'))
            predict = ml.predict(x)
            report = pd.DataFrame(classification_report(y, predict, output_dict=True))
            print(report)

        return Response(report, status=status.HTTP_200_OK)


class KonsultasiView(viewsets.ModelViewSet):
    serializer_class = KonsultasiSerializers
    queryset = MasterKonsultasi.objects.all()
    permission_classes = [isAdminOrMemberUser]

    @action(detail=True, methods=['post'])
    def predict_data(self, request, model_id):
        data = request.data
        query = MasterModel.objects.all()
        model = get_object_or_404(query, pk=model_id)

        file = joblib.load(model.path.open('rb'))
        data = list(data.values())
        data = [[data for data in data]]
        predict = file.predict(data)

        MasterKonsultasi.objects.create(
            name=predict,
            **request.data
        )

        return Response({'prediction': predict}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def all_method_predict(self, request):
        data = request.data
        query = MasterModel.objects.all()

        data = list(data.values())
        data = [[data for data in data]]
        result = []
        for model in query:
            file = joblib.load(model.path.open('rb'))
            predict = file.predict(data)
            result.append({"name": model.name, 'predict': predict})

        return Response(result, status=status.HTTP_200_OK)


class TrainingResultView(viewsets.GenericViewSet):
    serializer_class = TrainingResultSerializers
    queryset = MasterTrainingResult.objects.all()
    permission_classes(isAdminUser)

    def list(self, request):
        query = self.get_queryset()
        if query.count() < 20:
            serialize = self.get_serializer(query, many=True)
            return Response(serialize.data)
        serialize = self.get_serializer(query, many=True)
        return self.get_paginated_response(serialize.data)

    @action(detail=False, methods=['get'])
    def result_graph(self, request):
        query = self.get_queryset()
        data = pd.DataFrame(query.values('method_id__name', 'accuracy', 'precision', 'recall', 'f1_score'))

        list_graph = convert_to__dict_graph(data)
        return Response(list_graph, status=status.HTTP_200_OK)


def get_model_pipeline(*args):
    model = []

    for data in args:
        model.append(data)

    return model



# not fixed
@api_view(['POST'])
def cross_validation_model(request):
    dataset = pd.read_excel(request.FILES.get('file'))
    target = dataset['name']
    data = np.array(dataset.drop('name', axis='columns'))

    result = []
    query = MasterModel.objects.all()
    for model in query:
        file = pickle.load(model.path.open('rb'))
        score = cross_val_score(file, data,target, cv=KFold(n_splits=10), scoring='accuracy')
        result.append({'name': model.name, 'score': score})

    return Response(result, status=status.HTTP_200_OK)
    # return Response(status=status.HTTP_200_OK)

