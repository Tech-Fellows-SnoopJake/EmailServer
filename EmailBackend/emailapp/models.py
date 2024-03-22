from django.db import models

from emailprototype.settings import FAKE_DOMAIN
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError

# models here test

class User(AbstractUser):
    """
    Represents a user of the email system with custom logic.
    """
    
    def clean(self):
        """
        Custom model validation to ensure both username and password are provided.
        """
        super().clean()

        if not self.username:
            raise ValidationError({'username': ['This field is required.']})

        if not self.password:
            raise ValidationError({'password': ['This field is required.']})

    def save(self, *args, **kwargs):
        """
        Overrides the save method to customize user saving logic.
        """
        if not self.pk:  # Check if it's a new user to avoid modifying existing usernames
            self.username = self.username.lower() + FAKE_DOMAIN
            self.email = self.username  # Assuming username is the email address

        super(User, self).save(*args, **kwargs)


class Folder(models.Model):
    """
    Represents a folder in a user's email system.

    Attributes:
        name (CharField): The name of the folder, limited to 50 characters.
        user (ForeignKey): Relation to the User model, establishing a relationship between folders and users.
    """
    name = models.CharField(max_length=50)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='folders')


class Email(models.Model):
    """
    Represents an email message.

    Attributes:
        user (ForeignKey): Relation to the User model, indicating the user who owns this email.
        receiver (EmailField): The email address of the recipient.
        sender (EmailField): The email address of the sender.
        subject (CharField): The subject of the email, limited to 50 characters.
        body (TextField): The body content of the email.
        folder (ForeignKey): Relation to the Folder model, indicating the folder where this email is stored.
        created_at (DateTimeField): The date and time when the email was created.
    """
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='emails')
    receiver = models.EmailField(null=False)
    sender = models.EmailField(null=False)
    subject = models.CharField(max_length=50)
    body = models.TextField()
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True, blank=True,
                               related_name='emails')  # // [Inbox] (if is null!))
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        """
        Overrides the save method to normalize sender and receiver email addresses to lowercase before saving.
        """
        self.sender = self.sender.lower()
        self.receiver = self.receiver.lower()
        super(Email, self).save(*args, **kwargs)


def __str__(self):
    return self.name
