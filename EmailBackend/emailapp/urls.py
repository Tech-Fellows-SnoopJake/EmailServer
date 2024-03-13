from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views

# Define urlpatterns
urlpatterns = [
    path('login/', views.LoginAPIView.as_view()),  # Endpoint for user login
    path('users/', views.UserAPI.as_view()),  # Endpoint to retrieve list of users
    path('user/<int:pk>/', views.UserDetailsAPI.as_view()),  # Endpoint to retrieve details of a specific user
    path('emails/', views.EmailAPI.as_view()),  # Endpoint to retrieve list of emails
    path('email/<int:pk>/', views.EmailDetailsAPI.as_view()),  # Endpoint to retrieve details of a specific email
    path('mylist/<str:email>/', views.byEmail_APIView.as_view()),  # Endpoint to filter emails by receiver
    path('sendlist/<str:email>/', views.bySend_APIView.as_view()),  # Endpoint to filter emails by sender
]

# Define router for folders endpoint
router = SimpleRouter()
router.register('folders', views.Folders_APIView)

# Add router URLs to urlpatterns
urlpatterns += router.urls
