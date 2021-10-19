from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView

from blogs.models import Blog
from posts.models import Post


class BlogListView(ListView):
    model = Blog
    template_name = 'blog_list.html'
    context_object_name = 'blogs'


class BlogDetailView(DetailView):
    model = Blog
    template_name = 'blog.html'
    context_object_name = 'blog'

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        context['posts'] = Post.objects.filter(parent_blog=context['blog'])
        return context


def blog_delete(request, pk):
    blog = get_object_or_404(Blog, pk=pk)

    if request.method == 'POST':
        blog.delete()

    return redirect('/blogs')

