from django.urls import path, include
from .views import (
    Register,
    LoginUser,
    RegisterAdminView,
    LogoutUser,
    UserCustomerView,
    LoginAdmin,
    UserView,
    CpuView,
    GpuView,
    CompanyView,
    ScreenView,
    LaptopTypeView,
    MemoryTypeView,
    ResolutionView,
    DatasetView,
    add_dataset_with_file_view
)

from rest_framework.routers import DefaultRouter

app_name = "api"

router = DefaultRouter()
router.register(r'member', UserCustomerView, basename='member')
router.register(r'cpu', CpuView, basename='cpu')
router.register(r'gpu', GpuView, basename='gpu')
router.register(r'company', CompanyView, basename='company')
router.register(r'screen-type', ScreenView, basename='screen-type')
router.register(r'laptop-type', LaptopTypeView, basename='laptop-type')
router.register(r'memory-type', MemoryTypeView, basename='memory-type')
router.register(r'screen-reso', ResolutionView, basename='screen-reso')
router.register(r'dataset', DatasetView, basename='dataset')

urlpatterns = [
    path('register', Register.as_view(), name='user-register'),
    path('login', LoginUser.as_view(), name='user-login'),
    path('logout', LogoutUser.as_view(), name='all-user-logout'),
    path('staff/register', RegisterAdminView.as_view(), name='staff-register'),
    path('staff/login', LoginAdmin.as_view(), name='staff-login'),
    path('profile', UserView.as_view(), name='user-profile'),
    path('upload_dataset', add_dataset_with_file_view, name='user-profile'),
    path('ml/', include('ml.urls'))
]

urlpatterns += router.urls
