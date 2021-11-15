import requests
from django.conf import settings

from posts.models import Post


def validate_posts():
    unvalidated_posts = Post.objects.filter(validated=False)

    for post in unvalidated_posts:
        response = requests.post(settings.TEXT_CLASSIFICATION_URL, json={'post': post.body})
        if response.status_code == 200:
            data = response.json()
            if data:
                post.theme = data['prediction']
                post.validated = True
            else:
                post.validated = False

        post.save()

    return
