from django.db import models
from users.models import MyUser 




class Post(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(MyUser, related_name='liked_posts', blank=True)
  

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f'Post {self.pk} by {self.user.username}'


class Comment(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)    



# class Follower(models.Model):
#     follower = models.ForeignKey(MyUser, related_name='following', on_delete=models.CASCADE)
#     following = models.ForeignKey(MyUser, related_name='followers', on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)

# class Following(models.Model):
#     follower = models.ForeignKey(MyUser, related_name='following', on_delete=models.CASCADE)
#     followed_user = models.ForeignKey(MyUser, related_name='followers', on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)            
