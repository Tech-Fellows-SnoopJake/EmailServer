from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Email, Folder, User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model..
    """
    class Meta:
        model = User
        fields = ["id", "username", "date_joined"]

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer for obtaining token pairs.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username

        return token
