from django.db import models


# models here.
class User(models.Model):
    username = models.CharField(null=False, max_length=30, unique=True)
    password = models.CharField(null=False, max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)

    # Convert username to lowercase before saving
    def save(self, *args, **kwargs):
        self.username = self.username.lower() + '@test.com'
        super().save(*args, **kwargs)


class Folder(models.Model):
    name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='folders')


class Email(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emails')
    receiver = models.EmailField(null=False)
    sender = models.EmailField(null=False)
    subject = models.CharField(max_length=50)
    body = models.TextField()
    folder = models.ForeignKey(Folder, on_delete=models.SET_NULL, null=True, blank=True,
                               related_name='emails')  # // [Inbox] (mientras no sea modificado))
    created_at = models.DateTimeField(auto_now_add=True)


def __str__(self):
    return self.name
