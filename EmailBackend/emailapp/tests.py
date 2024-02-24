from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import User, Folder


class TestAPI(TestCase):
    
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(username='testuser', password='testpassword')
        self.folder = Folder.objects.create(name='Inbox', user=self.user)

    def test_create_user(self):
        response = self.client.post('/users/', {'username': 'new_user', 'password': 'new_password'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_users(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_folder(self):
        response = self.client.post('/folders/', {'name': 'New Folder', 'user': self.user.pk}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_folders(self):
        response = self.client.get('/folders/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_email(self):
        data = {
            'user': self.user.pk,
            'receiver': 'test@test.com',
            'sender': 'test2@test.com',
            'subject': 'Test Subject',
            'body': 'This is a test email',
            'folder': self.folder.pk
        }
        response = self.client.post('/emails/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_emails(self):
        response = self.client.get('/emails/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
