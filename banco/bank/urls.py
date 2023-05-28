from rest_framework import routers
from django.urls import path
from .views import *

router = routers.SimpleRouter()
router.register('cliente', ClienteCRUD)
router.register('conta', ContaCRUD)
router.register('cartao', CartaoCRUD)
router.register('endereco', EnderecoCRUD)
router.register('emprestimo', EmprestimoCRUD)


urlpatterns =[] + router.urls