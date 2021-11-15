from rest_framework import serializers

from posts.models import Comment, Post
from users.api.serializers import StrippedUserSerializer


class CommentSerializer(serializers.ModelSerializer):
    user = StrippedUserSerializer(read_only=True, source='owner')

    class Meta:
        model = Comment
        fields = ['id', 'owner', 'user', 'parent_post', 'body', 'created', 'updated']
        read_only_field = ['id', 'created', 'updated']


class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    user = StrippedUserSerializer(read_only=True, source='owner')

    class Meta:
        model = Post
        fields = ['id', 'owner', 'user', 'title', 'body', 'created', 'updated', 'comments', 'validated', 'theme']
        read_only_field = ['id', 'created', 'updated', 'validated', 'theme']
