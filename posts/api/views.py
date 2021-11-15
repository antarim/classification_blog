from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status

from posts.api.serializers import CommentSerializer, PostSerializer
from posts.models import Comment, Post


class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.filter(validated=True)
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        request.data['owner'] = request.user.id
        return super(PostList, self).create(request, *args, **kwargs)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def update(self, request, *args, **kwargs):
        if request.user.id == request.data['owner'] or request.user.is_staff:
            return super(PostDetail, self).update(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()
        if request.user.id == post.owner or request.user.is_staff:
            return super(PostDetail, self).destroy(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)


class CommentDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def destroy(self, request, *args, **kwargs):
        if request.user.id == request.data['owner'] or request.user.is_staff:
            return super(CommentDetail, self).destroy(request, *args, **kwargs)
        return Response(status=status.HTTP_403_FORBIDDEN)
