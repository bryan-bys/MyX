from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from .models import MyUser






# class FollowerViewSet(viewsets.ModelViewSet):
#     queryset = Follower.objects.all()
#     serializer_class = FollowerSerializer
#     authentication_classes = (TokenAuthentication,)
#     # permission_classes = [AllowAny]



#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user) 

#     def list(self, request):
#         user = request.user

#         followers = Follower.objects.filter(followed_user=user)
#         followers_data = UserSerializer(instance=[follower.user for follower in followers], many=True).data

#         following = Follower.objects.filter(user=user)
#         following_data = UserSerializer(instance=[follower.followed_user for follower in following], many=True).data

#         return Response({'followers': followers_data, 'following': following_data})




class UserViewSet(viewsets.ModelViewSet):
  queryset = MyUser.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

class Login(ObtainAuthToken):

  def post(self, request, *args, **kwargs):
    login_serializer = self.serializer_class(data=request.data, context={'request': request} )
    if login_serializer.is_valid():
      user = login_serializer.validated_data['user']
      if user.is_active:
          token,created = Token.objects.get_or_create(user = user)
          user_serializer = UserSerializer(user)
          if created:
            print('esta creado')
            return Response({
              'token':token.key,
              'user': user_serializer.data,
              'message':'Inicio de Sesion Exitoso'
            } , status= status.HTTP_201_CREATED)
          else:
            token.delete()
            token = Token.objects.create(user = user) 
            return Response({
              'token':token.key,
              'user': user_serializer.data,
              'message':'Inicio de Sesion Exitoso'
            } , status= status.HTTP_200_OK)
    else:
     return Response({'error':'Nombre de usuario o contraseña incorrectas'}, status= status.HTTP_400_BAD_REQUEST)   
      
    return Response({'message':'Hola muchacho desde el response'}, status= status.HTTP_200_OK)   



