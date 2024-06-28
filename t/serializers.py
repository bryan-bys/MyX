from rest_framework import serializers
from django.utils.timesince import timesince
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    time_since_created = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['id', 'timestamp', 'likes']
    
     

    def to_representation(self, instance):
      return{
        'id':instance.id,
        'user': instance.user.username,
        'content': instance.content,
        'timestamp':timesince (instance.timestamp).split(',')[0],
        'likes':[like.username for like in instance.likes.all()],
        'user_image':instance.user.image,
       }        
    
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['id', 'timestamp', 'created_at']
    

    def to_representation(self, instance):
      return{
        'id':instance.id,
        'user': instance.user.username,
        'post':instance.post.id,
        'content': instance.content,
        'created_at':instance.created_at,
        'user_image':instance.user.image,
       }        
        




