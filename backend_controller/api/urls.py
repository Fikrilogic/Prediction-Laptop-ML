from django.urls import path
from .views import (
    Register,
    LoginUser,
    RegisterAdminView,
    LogoutUser,
    UserCustomerView,
    LoginAdmin,
    UserView,
)
from django.views.decorators.csrf import (
    csrf_exempt
)
from django.conf import settings
from django.conf.urls.static import static

app_name = "api"

urlpatterns = [
    path('register', Register.as_view()),
    path('login', LoginUser.as_view()),
    path('logout', LogoutUser.as_view()),
    path('staff/register', RegisterAdminView.as_view()),
    path('staff/login', LoginAdmin.as_view()),
    path('profile', UserView.as_view()),
    path('user', UserCustomerView.as_view()),
    path('user/<str:id>',UserCustomerView.as_view())
]