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
from .tasks import get_dataset

from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
import joblib
import jwt

User = get_user_model()



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
@permission_classes([isAdminUser])
def test_model(request):
    dataset = get_dataset()
    y = dataset['name']
    X = dataset.drop('name', axis=1, inplace=True)
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
