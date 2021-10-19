from django.contrib.auth.models import User
from django.db import models

from blogs.models import Blog


class Post(models.Model):
    # Any user can create but only blog owner can redact/delete
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    parent_blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255)
    body = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.creator.username} - {self.title}"


class Comment(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    parent_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    body = models.CharField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.owner.username} - {self.body}"
