from django.urls import path
from .views import(
    MlModelView,
    KonsultasiView, TrainingResultView, cross_validation_model, CrossValidationView)
from rest_framework.routers import DefaultRouter
from django.views.decorators.csrf import (
    csrf_exempt
)

router = DefaultRouter()

# url
router.register(r'model', MlModelView, basename='model')
router.register(r'konsultasi', KonsultasiView, basename='konsultasi')
router.register(r'train-result', TrainingResultView, basename='training-result')
router.register(r'cross-val', CrossValidationView, basename='cross-validation')

urlpatterns = [
]

urlpatterns += router.urls
