from django.urls import path
from .views import(
    MlModelView,
    KonsultasiView, ResultView, predict_view, test_model, TrainingResultView)
from rest_framework.routers import DefaultRouter
from django.views.decorators.csrf import (
    csrf_exempt
)

router = DefaultRouter()

# url
router.register(r'model', MlModelView, basename='model')
router.register(r'konsultasi', KonsultasiView, basename='konsultasi')
router.register(r'result', ResultView, basename='result')
router.register(r'train-result', TrainingResultView, basename='training-result')

urlpatterns = [
    path('predict/<str:model_id>', predict_view),
    path('test-model', test_model),
]

urlpatterns += router.urls
