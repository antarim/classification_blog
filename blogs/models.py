from django.contrib.auth.models import User
from django.db import models


class Blog(models.Model):
    # Creator of blog, title, date created/updated/new post
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blogs')
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.owner.username} - {self.title}"
