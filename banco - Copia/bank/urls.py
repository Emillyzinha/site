from rest_framework import routers
from django.urls import path
from .views import *

router = routers.SimpleRouter()
router.register('usuario', ListarDetalharUsuario)
router.register('clientes', ClienteViewSet)

urlpatterns =[] + router.urls