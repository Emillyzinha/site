from django.shortcuts import render
from .models import *
from .serializes import *
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken

class ClienteCRUD(viewsets.ModelViewSet):
    queryset= Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = (IsAuthenticated, )

    # para encontrar valor igual aos parâmetros escolhidos. Retornar que o e-mail existe
    def get_queryset(self):
        queryset = Cliente.objects.all()
        cpfCliente = self.request.query_params.get('cpf')
        emailCliente = self.request.query_params.get('email')

        if cpfCliente is not None:
            queryset = queryset.filter(cpf=cpfCliente)
            return queryset
        
        if emailCliente is not None:
            queryset = queryset.filter(email=emailCliente)
            return queryset
        
        return super().get_queryset()

    def list(self, request, *args, **kwargs):
        # PARA VER QUEM É O AUTOR DO TOKEN
        # o split separa em uma lista
        token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
        print('aquiiiiiiiiiii', token)
        dados = AccessToken(token)
        print(dados)
        usuario = dados['user_id']
        print(usuario)

        # PARA SALVAR EM DIRETO EM UMA FOREIGN KEY

        # conta = Conta.objects.get(cliente=usuario) -- para a conta do usuario (so tem uma conta)
        # conta = Conta.objects.filter(cliente=usuario) -- para pegar. retorna lista
        # return Response(conta)

        return super().list(request, *args, **kwargs)
    
        # com base no ID do usuário que fez a requisição inserir dados em tabelas, fazer consultas (objects)
    
    def create(self, request, *args, **kwargs):

        return super().create(request, *args, **kwargs)
    
class ContaCRUD(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset= Conta.objects.all()
    serializer_class = ContaSerializer
    
# Para proteger as rotas 
# class ClienteViewSet(viewsets.ModelViewSet):
#     queryset = Cliente.objects.all()
#     serializer_class = ClienteSerializer
#     permission_classes = (IsAuthenticated, )

#     def list(self, request, *args, **kwargs):
#                 # PARA VER QUEM É O AUTOR DO TOKEN

#                 # o split separa em uma lista
#         token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
#         print('aquiiiiiiiiiii', token)
#         dados = AccessToken(token)
#         print(dados)
#         usuario = dados['user_id']
#         print(usuario)

#                 # conta = Conta.objects.get(cliente=usuario) -- para a conta do usuario (so tem uma conta)
#                 # conta = Conta.objects.filter(cliente=usuario) -- para pegar. retorna lista
#                 # return Response(conta)

#         return super().list(request, *args, **kwargs)
    
#             # com base no ID do usuário que fez a requisição inserir dados em tabelas, fazer consultas (objects)
    
#     def create(self, request, *args, **kwargs):

#         return super().create(request, *args, **kwargs)
