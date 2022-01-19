from .views import(
    MlModelView,
    KonsultasiView, TrainingResultView, CrossValidationView)
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

# url
router.register(r'model', MlModelView, basename='model')
router.register(r'konsultasi', KonsultasiView, basename='konsultasi')
router.register(r'train-result', TrainingResultView, basename='training-result')
router.register(r'cross-val', CrossValidationView, basename='cross-validation')

urlpatterns = [
]

urlpatterns += router.urls
