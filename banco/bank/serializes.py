from rest_framework import serializers
from .models import *

class ClienteDoBancoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClienteDoBanco
        fields = ['nomeCompleto', 'username', 'data_nascimento', 'cpf', 'numero_telefone', 'email', 'password']