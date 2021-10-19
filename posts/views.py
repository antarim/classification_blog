from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import DetailView

from posts.forms import PostForm
from posts.models import Post, Comment


class PostDetailView(DetailView):
    model = Post
    template_name = 'post.html'
    context_object_name = 'post'

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)

        context['comments'] = Comment.objects.filter(parent_post=context['post'])
        return context


def post_delete(request, pk):
    post = get_object_or_404(Post, pk=pk)

    if request.method == 'POST':
        post.delete()

    return redirect('/blogs')


def post_edit(request, pk):
    post = get_object_or_404(Post, pk=pk)

    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            post = form.save()
            post.save()
            return redirect('post', pk=post.id)
    else:
        form = PostForm(instance=post)
    return render(request, 'create_form.html', {'form': form})

    return redirect('/blogs')
