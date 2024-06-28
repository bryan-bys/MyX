from django.db import models
from django.contrib.auth.models import AbstractUser



class MyUser(AbstractUser):
    image = models.URLField(default='https://res.cloudinary.com/dwrepuhjc/image/upload/v1713576528/blank-profile-picture-973460_640_v8ejyd.png', blank=True)




# class Follower(models.Model):
#     user = models.ForeignKey(MyUser, related_name='following_user', on_delete=models.CASCADE)
#     followed_user = models.ForeignKey(MyUser, related_name='followers_user', on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)    
    
