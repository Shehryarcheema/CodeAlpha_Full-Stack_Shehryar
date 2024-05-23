# Inside social_media_platform/views.py

from django.shortcuts import render
from django.http import JsonResponse
from .models import Post

def index(request):
    posts = Post.objects.all().order_by('-created_at')
    return render(request, 'index.html', {'posts': posts})

def api_posts(request):
    posts = Post.objects.all().order_by('-created_at')
    data = [{'content': post.content, 'user': post.user.username, 'created_at': post.created_at} for post in posts]
    return JsonResponse(data, safe=False)
