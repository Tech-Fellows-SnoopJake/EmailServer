from django.contrib import admin
from .models import User, Email

# Register User and Email models in the Django admin panel.
admin.site.register(User)
admin.site.register(Email)
