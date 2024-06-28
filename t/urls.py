from django.urls import path, include
from rest_framework.routers import DefaultRouter
from t import views 

router = DefaultRouter()
router.register(r'post', views.PostViewSet)
router.register(r'comment', views.CommentViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('like/<int:pk>/',views.PostViewSet.as_view({'post':'like'}), name='like' ),
    path('posts/<int:post_id>/comments/', views.CommentViewSet.as_view({'get': 'list'}), 
    name='post-comments'),
    path('posts/user_posts/', views.PostViewSet.as_view({'get': 'user_posts'}), name='post-user-posts'),
]