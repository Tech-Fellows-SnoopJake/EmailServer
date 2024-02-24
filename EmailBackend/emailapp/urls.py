from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views

urlpatterns = [
    path('login/', views.LoginAPIView.as_view()),
    path('users/', views.UserAPI.as_view()),
    path('user/<int:pk>/', views.UserDetailsAPI.as_view()),
    path('emails/', views.EmailAPI.as_view()),
    path('email/<int:pk>/', views.EmailDetailsAPI.as_view()),
    path('mylist/<str:email>/', views.ByEmail_APIView.as_view()),
    path('sendlist/<str:email>/', views.bySend_APIView.as_view()),
]

router = SimpleRouter()
router.register('folders', views.Folders_APIView)
urlpatterns += router.urls


