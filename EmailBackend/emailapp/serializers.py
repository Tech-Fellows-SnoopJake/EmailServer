from rest_framework import serializers
from .models import Email, Folder, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ['user', 'receiver', 'sender', 'subject', 'body', 'folder']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make the folder field optional
        self.fields['folder'].required = False

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = '__all__'
