from django.db import IntegrityError
from django.forms import ValidationError
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from emailprototype.settings import FAKE_DOMAIN
from .serializers import EmailSerializer, FolderSerializer, UserSerializer
from .models import Email, Folder, User
from .serializers import MyTokenObtainPairSerializer


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
        existing_user = User.objects.filter(
            username=request.data.get('username'))
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
    permission_classes = [IsAuthenticated]

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

class UserTokenAPI(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MyTokenObtainPairView(TokenObtainPairView):
    """
    API endpoint for user login
    """
    serializer_class = MyTokenObtainPairSerializer

class ValidateTokenAPI(APIView):
    """
    API endpoint for validating token, used to check if the token is still valid, if it is, the user is still logged in.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Validate the token
        """
        return Response(status=status.HTTP_200_OK)


class LogoutAPIView(APIView):
    """
    API endpoint for user logout
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        Blacklist the refresh token
        """

        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# class LoginAPIView(APIView):
#     """
#     API endpoint for user login
#     """

#     def post(self, request):
#         """
#         Authenticate user or create new user if not exists
#         """
#         try:
#             username = request.data.get('username')
#             password = request.data.get('password')

#             # Validate that the username exists
#             user = User.objects.filter(username=username).first()
#             if not user:
#                 # Create a new user if the username does not exist
#                 user = User.objects.create(
#                     username=username.split('@')[0], password=password)

#                 return Response({
#                     'id': user.id,
#                     'username': user.username
#                     # Add more user attributes here if needed
#                 }, status=status.HTTP_201_CREATED)

#             # Validate the password by comparing
#             if user.password != password:
#                 return Response({'error': 'Invalid password.'}, status=status.HTTP_400_BAD_REQUEST)

#             payload = {
#                 "user_id": user.id,
#                 "exp": datetime.datetime.now() + datetime.timedelta(minutes=1),
#                 "iat": datetime.datetime.now()
#             }
#             jwt_token = jwt.encode(
#                 payload, 'SECRET', algorithm='HS256')

#             # Successful authentication, return the user object
#             response = Response({
#                 'id': user.id,
#                 'username': user.username,
#                 # Add more user attributes here if needed
#             }, status=status.HTTP_200_OK)
#             response.set_cookie('jwt', jwt_token, httponly=True)

#             return response

#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Email C.R.U.D

class EmailAPI(APIView):
    """
    API endpoint for Email CRUD operations.
    """
    permission_classes = [IsAuthenticated]

    # Method to validate that the email exists
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
        receiver_val = EmailAPI.user_exists(
            request.data.get('receiver').lower())
        sender_val = EmailAPI.user_exists(request.data.get('sender').lower())
        # Validate that the email exists
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
    permission_classes = [IsAuthenticated]

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


class ByEmailAPIView(APIView):
    """
    API endpoint to retrieve a list of emails received per user.
    """
    permission_classes = [IsAuthenticated]

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


class BySendAPIView(APIView):
    """
    API endpoint to retrieve a list of emails sent by user..
    """
    permission_classes = [IsAuthenticated]

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


class FoldersAPIView(viewsets.ModelViewSet):
    """
    API endpoint for Folder CRUD operations.
    """
    permission_classes = [IsAuthenticated]

    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    def get_queryset(self):
        """
        Optionally restricts the returned folders to a given user,
        by filtering against a `user_id` query parameter in the URL.
        """
        queryset = Folder.objects.all()
        user_id = self.request.query_params.get('user_id')
        if user_id is not None:
            queryset = queryset.filter(user__id=user_id)
        return queryset
