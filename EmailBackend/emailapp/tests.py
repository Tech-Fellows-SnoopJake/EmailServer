from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

class apiTests(APITestCase):
    def setUp(self):
        # Create sample users and folders
        self.client = APIClient()
        self.user1 = User.objects.create(username='testuser', password='testpassword')
        self.user2 = User.objects.create(username='testuser2', password='testpassword')
        
        # Save the objects to ensure primary keys are assigned
        self.user1.save()
        self.user2.save()

        # Generate JWT tokens for authentication
        self.token_user1 = self.get_tokens_for_user(self.user1)['access']
        self.token_user2 = self.get_tokens_for_user(self.user2)['access']

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def test_create_user(self):
        response = self.client.post('/users/', {'username': 'new_user', 'password': 'new_password'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_users(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_folder(self):
        # Add JWT token for user 1 to the request
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token_user1)
        response = self.client.post('/folders/', {'name': 'New Folder', 'user': self.user1.pk}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_folders(self):
        # Add JWT token for user 1 to the request
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token_user1)
        response = self.client.get('/folders/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_email(self):
        data = {
            'user': self.user1.pk,
            'receiver': 'testuser@snoopjake.com',
            'sender': 'testuser2@snoopjake.com',
            'subject': 'Test Subject',
            'body': 'This is a test email'
        }
        # Add JWT token for user 1 to the request
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token_user1)
        response = self.client.post('/emails/', data, format='json')
        print(response)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_create_email2(self):
        data = {
            'user': self.user1.pk,
            'receiver': 'testuser@snoopjake.com',
            'sender': 'testuser2@snoopjake.com',
            'subject': 'Test Subject',
            'body': 'This is a test email'
        }
        response = self.client.post('/emails/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_emails(self):
        # Add JWT token for user 1 to the request
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.token_user1)
        response = self.client.get('/emails/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)