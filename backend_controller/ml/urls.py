from django.urls import path
from .views import(
    MlModelView,
    KonsultasiView, TrainingResultView, cross_validation_model)
from rest_framework.routers import DefaultRouter
from django.views.decorators.csrf import (
    csrf_exempt
)

router = DefaultRouter()

# url
router.register(r'model', MlModelView, basename='model')
router.register(r'konsultasi', KonsultasiView, basename='konsultasi')
router.register(r'train-result', TrainingResultView, basename='training-result')

urlpatterns = [
    path('crossval-model', cross_validation_model)
]

urlpatterns += router.urls
