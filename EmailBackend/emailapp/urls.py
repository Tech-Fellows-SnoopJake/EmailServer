from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserAPI.as_view()),
    path('user/<int:pk>/', views.UserDetailsAPI.as_view()),
    
    path('emails/', views.EmailAPI.as_view()),
    path('email/<int:pk>/', views.EmailDetailsAPI.as_view()),
    path('emails/<str:email>/', views.ByEmail_APIView.as_view()),
]


