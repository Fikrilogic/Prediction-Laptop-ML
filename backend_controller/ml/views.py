import pickle

from django.shortcuts import render
from api.permissions import isAdminUser, isAdminOrMemberUser, isMemberUser
from api.models import MasterDataset
from django.conf import settings
from django.views.decorators.csrf import (
    csrf_exempt
)
from django.contrib.auth import get_user_model

from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404

from .serializers import ModelSerializers, KonsultasiSerializers, ResultSerializers, TrainingResultSerializers
from .models import MasterModel, MasterKonsultasi, MasterHasil, MasterTrainingResult
from .tasks import get_dataset, save_result, nb_pipeline, dt_pipeline, knn_pipeline, gb_pipeline

from sklearn.model_selection import KFold, cross_val_score
import joblib
import jwt

User = get_user_model()


# Create your views here.
class MlModelView(viewsets.ModelViewSet):
    serializer_class = ModelSerializers
    queryset = MasterModel.objects.all()
    permission_classes = [isAdminUser]
    # parser_classes = [MultiPartParser, FormParser]

    @action(detail=True, methods=['post'])
    def predict_data(self, request, model_id):
        data = request.data
        query = self.get_queryset()
        model = get_object_or_404(query, pk=model_id)

        file = joblib.load(model.path.open('rb'))
        data = list(data.values())
        data = [[data for data in data]]
        predict = file.predict(data)

        return Response({'prediction': predict}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def all_method_predict(self, request):
        data = request.data
        query = self.get_queryset()

        data = list(data.values())
        data = [[data for data in data]]
        print(query)
        result = []
        for model in query:
            file = joblib.load(model.path.open('rb'))
            predict = file.predict(data)
            result.append({"name": model.name, 'predict': predict})

        return Response(result, status=status.HTTP_200_OK)


class KonsultasiView(viewsets.ModelViewSet):
    serializer_class = KonsultasiSerializers
    queryset = MasterKonsultasi.objects.all()
    permission_classes = [isAdminOrMemberUser]


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

def get_model_pipeline(*args):
    model = []

    for data in args:
        model.append(data)

    return model


@api_view(['GET'])
def cross_validation_model(request):
    dataset = get_dataset()
    target = dataset['name']
    data = dataset.drop('name', axis='columns')
    print(data)
    result = []
    query = MasterModel.objects.all()
    for model in query:
        file = pickle.load(model.path.open('rb'))
        # print(file)
        # score = cross_val_score(file, data, target, cv=KFold(n_splits=10), scoring='accuracy')
        # result.append({'name': model.name, 'score': score})
    return Response(result, status=status.HTTP_200_OK)