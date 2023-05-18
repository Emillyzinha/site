from django.shortcuts import render
from .models import ClienteDoBanco
from .serializes import ClienteDoBancoSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken

class ListarDetalharUsuario(viewsets.ModelViewSet):
    queryset= ClienteDoBanco.objects.all()
    serializer_class = ClienteDoBancoSerializer

    # para encontrar valor igual aos parâmetros escolhidos. Retornar que o e-mail existe
    def get_queryset(self):

        queryset = ClienteDoBanco.objects.all()
        cpfCliente = self.request.query_params.get('cpf')
        emailCliente = self.request.query_params.get('email')

        if cpfCliente is not None:
            queryset = queryset.filter(cpf=cpfCliente)
            return queryset
        
        if emailCliente is not None:
            queryset = queryset.filter(email=emailCliente)
            return queryset
        
        return super().get_queryset()
    
# Para proteger as rotas 
class ClienteViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = ClienteDoBanco.objects.all()
    serializer_class = ClienteDoBancoSerializer

    def list(self, request, *args, **kwargs):
        # PARA VER QUEM É O AUTOR DO TOKEN

        # o split separa em uma lista
        token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
        print('aquiiiiiiiiiii', token)
        dados = AccessToken(token)
        print(dados)
        usuario = dados['user_id']
        print(usuario)

        return super().list(request, *args, **kwargs)
    
    # com base no ID do usuário que fez a requisição inserir dados em tabelas, fazer consultas (objects)
    
    def create(self, request, *args, **kwargs):

        return super().create(request, *args, **kwargs)
