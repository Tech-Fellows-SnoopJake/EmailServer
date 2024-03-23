from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

from emailapp.views import MyTokenObtainPairView

# Define urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel endpoint
    path('', include('emailapp.urls')),  # Include emailapp URLs
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
