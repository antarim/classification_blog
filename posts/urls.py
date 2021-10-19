from django.urls import path
import posts.views as views

urlpatterns = [
    path('<int:pk>/', views.PostDetailView.as_view(), name='post'),
    path('delete/<int:pk>/', views.post_delete, name='post_delete'),
    path('edit/<int:pk>/', views.post_edit, name='post_edit'),
]
