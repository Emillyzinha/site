from rest_framework import serializers
from .models import *

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ['nomeCompleto', 'username', 'data_nascimento', 'cpf', 'numero_telefone', 'email', 'password']

class ContaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conta
        fields = ["agencia", "numero", "status", "tipo", "saldo", "fk_cliente"]

class EnderecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endereco
        fields = ["pais", "estado", "cidade", "bairro", "logradouro", "numero", "address", "fk_conta"]

class CartaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cartao
        fields = ["numero", "CVV", "data_validade", "nome_titular", "fk_conta"]
