from rest_framework import serializers
from .models import Email, Folder, User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model..
    """
    class Meta:
        model = User
        fields = '__all__'

class EmailSerializer(serializers.ModelSerializer):
    """
    Serializer for the Email model.

    Makes the 'folder' field optional.
    """
    class Meta:
        model = Email
        fields = ['user', 'receiver', 'sender', 'subject', 'body', 'folder']
        
    def __init__(self, *args, **kwargs):
        """
        Initializes the EmailSerializer instance.

        Makes the 'folder' field optional.
        """
        super().__init__(*args, **kwargs)
        # Make the folder field optional
        self.fields['folder'].required = False

class FolderSerializer(serializers.ModelSerializer):
    """
    Serializer for the Folder model.
    """
    class Meta:
        model = Folder
        fields = '__all__'
