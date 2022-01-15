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

from .serializers import ModelSerializers, KonsultasiSerializers, ResultSerializers
from .models import MasterModel, MasterKonsultasi, MasterHasil

import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
import joblib
import jwt

User = get_user_model()


# function for dataset
def get_dataset():
    dataset = pd.DataFrame(
        MasterDataset.objects.all().values('budget', 'cpu_id__name', 'gpu_id__merk', 'gpu_id__name', 'ram',
                                         'memory_id__type', 'company_id__name',
                                         'screen_id__type', 'sc_res_id__resolusi', 'weight', 'type_id__name',
                                         'predict')
    )
    return dataset


# Create your views here.
class MlModelView(viewsets.ModelViewSet):
    serializer_class = ModelSerializers
    queryset = MasterModel.objects.all()
    permission_classes = [isAdminUser]
    parser_classes = [MultiPartParser, FormParser]


class KonsultasiView(viewsets.ModelViewSet):
    serializer_class = KonsultasiSerializers
    queryset = MasterKonsultasi.objects.all()
    permission_classes = [isAdminOrMemberUser]


class ResultView(viewsets.ModelViewSet):
    serializer_class = ResultSerializers
    queryset = MasterHasil.objects.all()
    permission_classes = [isAdminOrMemberUser]


@api_view(['POST'])
def predict_view(request, model_id):
    token = request.COOKIES.get('jwt')
    data = request.data

    payload = jwt.decode(
        token, settings.SECRET_KEY, algorithms='HS256')

    user = User.objects.get(pk=payload['id'])
    model = MasterModel.objects.get(pk=model_id)
    file = joblib.load(model.path.open('rb'))

    gpu_merk = data['gpu'].split(" ", 1)[0]
    gpu = data['gpu'].split(" ", 1)[1]
    data = list(data.values())
    data[2] = gpu_merk
    data.insert(3, gpu)
    data.pop(-1)
    data = [[data for data in data]]
    predict = file.predict(data)

    return Response({'prediction': predict[0]}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([isAdminUser,])
def test_model(self, request):
    dataset = get_dataset()
    y = dataset['predict']
    X = dataset.drop('predict', axis=1, inplace=True)
    model = MasterModel.objects.all()

    result = []
    for data in model:
        method = joblib.load(data.path.open('rb'))
        predict = method.predict(X)
        acc = accuracy_score(y, predict)
        recall = recall_score(y, predict)
        precisi = precision_score(y, predict)
        f1 = f1_score(y, predict)
        data = {
            'method': data.name,
            'accuracy': acc,
            'precision': precisi,
            'recall': recall,
            'f1-score': f1
        }
        result.append(data)

    return Response(result)
