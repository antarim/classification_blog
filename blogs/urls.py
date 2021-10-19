from django.urls import path
import blogs.views as views

urlpatterns = [
    path('', views.BlogListView.as_view(), name='blogs'),
    path('<int:pk>/', views.BlogDetailView.as_view(), name='blog'),
    path('delete/<int:pk>/', views.blog_delete, name='blog_delete'),
]
