from rest_framework import routers
from django.urls import path
from .views import *

router = routers.SimpleRouter()
router.register('usuario', ClienteCRUD)
router.register('conta', ContaCRUD)
router.register('cartao', CartaoCRUD)
router.register('endereco', EnderecoCRUD)


urlpatterns =[] + router.urls