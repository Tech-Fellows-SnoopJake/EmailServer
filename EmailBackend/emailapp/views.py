from django.db import IntegrityError
from django.forms import ValidationError
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from emailprototype.settings import FAKE_DOMAIN
from .serializers import EmailSerializer, FolderSerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from .models import Email, Folder, User


# User C.R.U.D
class UserAPI(APIView):
    """
    API endpoint for User CRUD operations.
    """
    @method_decorator(csrf_exempt)
    def get(self, request):
        """
        Retrieve a list of all users.
        """
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Create a new user.
        """
        existing_user = User.objects.filter(username=request.data.get('username'))
        # Validate that the username is not being updated to one that already exists.
        if existing_user.exists():
             return Response({'error': 'This username is already in use.'}, status=status.HTTP_400_BAD_REQUEST)      
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError:
            return Response({'error': 'This username is already in use.'}, status=status.HTTP_400_BAD_REQUEST)

class UserDetailsAPI(APIView):
    """
    API endpoint for retrieving, updating, or deleting a specific user.
    """
    @csrf_exempt
    def get_object(self, pk):
        """
        Get user object by primary key.
        """
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        """
        Retrieve details of a specific user.
        """
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update details of a specific user.
        """
        user = self.get_object(pk)
        serializer = UserSerializer(user, data=request.data)

        # Validate that the username is not being updated to one that already exists.
        if 'username' in request.data and User.objects.exclude(pk=pk).filter(
                username=request.data['username'].lower()).exists():
            return Response({'username': ['This username is already in use.']})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete a specific user.
        """
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class LoginAPIView(APIView):
    """
    API endpoint for user login 
    """
    def post(self, request):
        """
        Authenticate user or create new user if not exists
        """
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            
            # Validate that the username exists
            user = User.objects.filter(username=username).first()
            if not user:
                # Create a new user if the username does not exist
                user = User.objects.create(username=username.split('@')[0], password=password)  # You can add more fields here according to your user model
                return Response({
                    'id': user.id,
                    'username': user.username
                    # Add more user attributes here if needed
                }, status=status.HTTP_201_CREATED)
            
            # Validate the password by comparing
            if user.password != password:
                return Response({'error': 'Invalid password.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Successful authentication, return the user object
            return Response({
                'id': user.id,
                'username': user.username,
                # Add more user attributes here if needed
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
# Email C.R.U.D
class EmailAPI(APIView):
    """
    API endpoint for Email CRUD operations.
    """
    #permission_classes = [IsAuthenticated]
    #Method to validate that the email exists
    @staticmethod
    def user_exists(username):
        """
        Check if the user exists.
        """
        if FAKE_DOMAIN in username:
            return User.objects.filter(username__iexact=username).exists()
        else:
            return False
       
    @method_decorator(csrf_exempt)
    def get(self, request):
        """
        Retrieve a list of all emails.
        """
        emails = Email.objects.all()
        serializer = EmailSerializer(emails, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        """
        Create a new email.
        """
        serializer = EmailSerializer(data=request.data)
        receiver_val = EmailAPI.user_exists(request.data.get('receiver').lower())
        sender_val = EmailAPI.user_exists(request.data.get('sender').lower())
        #Validate that the email exists
        if sender_val and receiver_val and serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        elif sender_val == False or receiver_val == False:
            return Response({'error': 'This email dont exist!.'}, status=status.HTTP_400_BAD_REQUEST)        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class EmailDetailsAPI(APIView):
    """
    API endpoint for retrieving, updating, or deleting a specific email.
    """
    #permission_classes = [IsAuthenticated]
    def get_object(self, pk):
        """
        Get email object by primary key.
        """
        try:
            return Email.objects.get(pk=pk)
        except Email.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        """
        Retrieve details of a specific email.
        """
        email = self.get_object(pk)
        serializer = EmailSerializer(email)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update details of a specific email.
        """
        email = self.get_object(pk)
        serializer = EmailSerializer(email, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete a specific email.
        """
        email = self.get_object(pk)
        email.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# List of emails received per user
class byEmail_APIView(APIView):
    """
    API endpoint to retrieve a list of emails received per user.
    """
    #permission_classes = [IsAuthenticated]
    @csrf_exempt
    def get(self, request, format=None, *args, **kwargs):
        """
        Retrieve a list of emails received per user.
        """
        arg = kwargs
        try:
            post = Email.objects.filter(receiver=(arg.get('email')).lower())
            serializer = EmailSerializer(post, many=True)
            return Response(serializer.data)
        except Email.DoesNotExist:
            raise Http404

# List of emails sent by user
class bySend_APIView(APIView):
    """
    API endpoint to retrieve a list of emails sent by user..
    """
    #permission_classes = [IsAuthenticated]
    @csrf_exempt
    def get(self, request, format=None, *args, **kwargs):
        """
        Retrieve a list of emails sent by user.
        """
        arg = kwargs
        try:
            post = Email.objects.filter(sender=(arg.get('email')).lower())
            serializer = EmailSerializer(post, many=True)
            return Response(serializer.data)
        except Email.DoesNotExist:
            raise Http404

# Folders C.R.U.D  Crazy rigth?!.
class Folders_APIView(viewsets.ModelViewSet):
    """
    API endpoint for Folder CRUD operations.
    """
    permission_classes = [IsAuthenticated]
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    
