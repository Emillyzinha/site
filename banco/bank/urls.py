from rest_framework import routers
from django.urls import path
from .views import *

router = routers.SimpleRouter()
router.register('usuario', ClienteCRUD)
router.register('conta', ContaCRUD)


urlpatterns =[] + router.urls