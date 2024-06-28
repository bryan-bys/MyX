from rest_framework import serializers
from rest_framework.authtoken.views import Token
from .models import  MyUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'username' , 'password', 'image']


    
    def create(self, validated_data):
      user = MyUser.objects.create_user(**validated_data)
      Token.objects.create(user=user)
      return user
    
   
# class FollowerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Follower
#         fields = '__all__'