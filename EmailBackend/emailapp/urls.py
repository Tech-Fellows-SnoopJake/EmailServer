from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views

# Define urlpatterns
urlpatterns = [
    path('users/', views.UserAPI.as_view()),  # Endpoint to retrieve list of users
    path('user/<int:pk>/', views.UserDetailsAPI.as_view()),  # Endpoint to retrieve details of a specific user
    path('emails/', views.EmailAPI.as_view()),  # Endpoint to retrieve list of emails
    path('email/<int:pk>/', views.EmailDetailsAPI.as_view()),  # Endpoint to retrieve details of a specific email
    path('mylist/<str:email>/', views.ByEmailAPIView.as_view()),  # Endpoint to filter emails by receiver
    path('sendlist/<str:email>/', views.BySendAPIView.as_view()),  # Endpoint to filter emails by sender
    path('logout/', views.LogoutAPIView.as_view()),  # Endpoint to log out a user
]

# Define router for folders endpoint
router = SimpleRouter()
router.register('folders', views.FoldersAPIView, basename='folder')

# Add router URLs to urlpatterns
urlpatterns += router.urls
