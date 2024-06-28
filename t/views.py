
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action



class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = (TokenAuthentication,)


    def like(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        user = request.user

        if user in post.likes.all():
            print("no esta")
            post.likes.remove(user)
            action = 'unliked'
        else:
            post.likes.add(user)
            action = 'liked'

        post.save()
        return Response({'status': action}, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def user_posts(self, request):
        user = request.user  
        user_posts = Post.objects.filter(user=user)
        serializer = self.get_serializer(user_posts, many=True)
        return Response(serializer.data)
        


      
         
    
class CommentViewSet(viewsets.ModelViewSet):
      queryset = Comment.objects.all()
      serializer_class = CommentSerializer
      # authentication_classes = (TokenAuthentication,)
      permission_classes = {AllowAny}

      def list(self, request, post_id=None):
        queryset = Comment.objects.filter(post_id=post_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)



    

