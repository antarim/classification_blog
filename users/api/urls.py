from django.urls import path
import users.api.views as views

urlpatterns = [
    path('auth/login', views.LoginViewSet.as_view({'post': 'create'}), name='auth-login'),
    path('auth/register', views.RegisterViewSet.as_view({'post': 'create'}), name='auth-register'),
    path('auth/refresh', views.RefreshViewSet.as_view({'post': 'create'}), name='auth-refresh'),
]
