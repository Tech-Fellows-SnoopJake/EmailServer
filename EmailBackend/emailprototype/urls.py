from django.contrib import admin
from django.urls import path, include

# Define urlpatterns
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin panel endpoint
    path('', include('emailapp.urls')),  # Include emailapp URLs
]
