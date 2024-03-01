from django.db import models

from emailprototype.settings import FAKE_DOMAIN


# models here test
class User(models.Model):
    """
    Represents a user of the email system.

    Attributes:
        username (CharField): The username of the user, must be unique and limited to 30 characters.
        password (CharField): The password of the user, limited to 30 characters.
        created_at (DateTimeField): The date and time when the user was created.
    """
    username = models.CharField(null=False, max_length=30, unique=True)
    password = models.CharField(null=False, max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    def save(self, *args, **kwargs):
        """
        Overrides the save method to normalize the username to lowercase and concatenate FAKE_DOMAIN to it before saving.
        """
        self.username = self.username.lower() + FAKE_DOMAIN
        super(User, self).save(*args, **kwargs)

class Folder(models.Model):
    """
    Represents a folder in a user's email system.

    Attributes:
        name (CharField): The name of the folder, limited to 50 characters.
        user (ForeignKey): Relation to the User model, establishing a relationship between folders and users.
    """
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='folders')


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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emails')
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
