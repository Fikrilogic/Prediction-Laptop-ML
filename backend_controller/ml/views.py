import pickle

from django.shortcuts import render
from api.permissions import isAdminUser, isAdminOrMemberUser, isMemberUser
from api.models import MasterLaptop

from django.contrib.auth import get_user_model
from django.db.models import Max

from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.exceptions import (
    NotFound, ParseError
)

from .serializers import ModelSerializers, KonsultasiSerializers, TrainingResultSerializers, CrossValidationSerializers
from .models import MasterModel, MasterKonsultasi, MasterTrainingResult, MasterCrossvalResult, MasterHasil
from .utils import convert_to__dict_graph, create_cross_val_dict

from sklearn.metrics import accuracy_score
import pandas as pd
import numpy as np
import joblib

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
        results = []
        try:
            query = self.get_queryset()
            for model in query:
                ml = pickle.load(model.path.open('rb'))
                predict = ml.predict(x)
                results.append({'name': model.name, 'accuracy': accuracy_score(y, predict)})

            return Response(results, status=status.HTTP_200_OK)
        except ValueError:
            raise NotFound('Model is Empty')


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

        try:
            data = list(data.values())
            data = [[data for data in data]]
            predict = file.predict(data)
        except ValueError as e:
            raise ParseError(str(e))

        konsul = MasterKonsultasi.objects.create(
            **request.data
        )

        MasterHasil.objects.create(
            konsultasi_id=konsul.id,
        )

        name = MasterLaptop.objects.filter(name=predict).first()

        return Response({'prediction': predict, "laptop": f"api/laptop/{name.id}"}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def all_method_predict(self, request):
        data = request.data
        query = MasterModel.objects.all()

        data = list(data.values())
        data = [[data for data in data]]
        result = []

        try:
            for model in query:
                file = joblib.load(model.path.open('rb'))
                predict = file.predict(data)
                name = MasterLaptop.objects.filter(name=predict).first()
                result.append({"name": model.name, 'predict': predict, "laptop": f"/api/laptop/{name.id}"})
        except ValueError as e:
            raise ParseError(str(e))

        return Response(result, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def knn(self, request):
        data = request.data

        knn_higher_acc = MasterTrainingResult.objects.exclude(knn_k=0).order_by('-accuracy').first()

        query = MasterModel.objects.filter(id=knn_higher_acc.method_id).first()
        data = list(data.values())
        data = [[data for data in data]]

        try:
            file = joblib.load(query.path.open('rb'))
            predict = file.predict(data)
            name = MasterLaptop.objects.filter(name=predict).first()
            return Response({"name": query.name, "predict": predict, "laptop": f"/api/laptop/{name.id}"})
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class TrainingResultView(viewsets.GenericViewSet):
    serializer_class = TrainingResultSerializers
    queryset = MasterTrainingResult.objects.all()
    permission_classes = [isAdminUser]

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
        data = pd.DataFrame(query.filter(knn_k=0).values('method_id__name', 'accuracy', 'precision', 'recall', 'f1_score'))

        try:
            list_graph = convert_to__dict_graph(data)
        except ValueError as e:
            raise ParseError(str(e))

        return Response(list_graph, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def knn(self, request):
        query = self.get_queryset()
        data = pd.DataFrame(query.exclude(knn_k=0).values('method_id__name', 'accuracy', 'precision', 'recall', 'f1_score'))

        try:
            graph = convert_to__dict_graph(data)
        except ValueError as e:
            raise ParseError(str(e))

        return Response(graph)


class CrossValidationView(viewsets.GenericViewSet):
    serializer_class = CrossValidationSerializers
    queryset = MasterCrossvalResult.objects.all()
    permission_classes = [isAdminUser]

    def list(self, request):
        query = self.get_queryset()
        if query.count() < 20:
            serialize = self.get_serializer(query, many=True)
            return Response(serialize.data)

        serialize = self.get_serializer(query, many=True)
        return self.get_paginated_response(serialize.data)

    @action(detail=False, methods=['get'])
    def get_graph(self, request):
        query = self.get_queryset().exclude(name__icontains="K-Nearest")
        data_filter = query.values(
            'name',
            'test1',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
        )
        df = pd.DataFrame(data_filter)
        try:
            result = create_cross_val_dict(df)
        except ValueError as e:
            raise ParseError(str(e))

        return Response(result, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def knn(self, request):
        query = self.get_queryset().filter(name__icontains="K-Nearest")
        data_filter = query.values(
            'name',
            'test1',
            'test2',
            'test3',
            'test4',
            'test5',
            'test6',
            'test7',
            'test8',
            'test9',
            'test10',
        )
        df = pd.DataFrame(data_filter)
        try:
            result = create_cross_val_dict(df)
        except ValueError as e:
            raise ParseError(str(e))

        return Response(result, status=status.HTTP_200_OK)
    
    

