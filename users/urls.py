from django.urls import path, include
from rest_framework import routers
from users import views


router = routers.DefaultRouter()
router.register  (r'register', views.UserViewSet, basename='register' )
# router.register  (r'followers', views.FollowerViewSet, basename='producto' )




urlpatterns = [
  path('', include(router.urls)),
  path('login/',views.Login.as_view(), name='login')
] 