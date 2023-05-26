from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from .serializes import *
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from django.http import HttpResponse
from django.core import serializers

def dados_usuario(request):
    token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
    dados = AccessToken(token)
    usuario = dados['user_id']
    return usuario

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

class EnderecoCRUD(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset= Endereco.objects.all()
    serializer_class = EnderecoSerializer

    # def list(self, request, *args, **kwargs):
    #     id_cliente = dados_usuario(request)
    #     id_cliente_endereco = request.data['fk_cliente'] = id_cliente
    #     if id_cliente_endereco.exists():
    #         print('-'*50)
    #         print('existe')
    #     elif id_cliente_endereco.DoesNotExist():
    #         print('-'*50)
    #         print('não existe')

    #     return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):

        # CRIAR ENDEREÇO E SUBSTITUIR A FK DE CLIENTE
        id_cliente = dados_usuario(request)
        cliente = Cliente.objects.get(id=id_cliente)
        id_cliente_endereco = request.data['fk_cliente'] = id_cliente
        endereco = Endereco.objects.filter(fk_cliente=id_cliente).exists()
        if not endereco:
            print('-'*50)
            print('não existe')

            request.POST._mutable = True

            # CRIANDO NOVO CARTÃO
            numero_cartao = ''
            for i in range(0,9):
                num_cartao = str(randint(0,16))
                numero_cartao += num_cartao

            numero_CVV = ''
            for i in range(0,9):
                num_cvv = str(randint(0,3))
                numero_CVV += num_cvv

            nome_cartao = cliente.nomeCompleto
            conta = Conta.objects.get(fk_cliente_id = id_cliente_endereco)
            id_conta = conta.id
            bandeira = 'AVISTA'

            novo_cartao = Cartao.objects.create(numero=numero_cartao, CVV=numero_CVV, data_validade='2023-12-10', nome_titular=nome_cartao, bandeira=bandeira, fk_conta_id=id_conta)
            novo_cartao.save()
        elif endereco:
            print('-'*50)
            print('existe')
            response = HttpResponse("Account already has a card.")
            return response      

        return super().create(request, *args, **kwargs)

    
    # def list(self, request, *args, **kwargs):
    #     token = request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
    #     print('hereeeeeeeeeeeeee', token)
    #     dados = AccessToken(token)
    #     print(dados)
    #     usuario = dados['user_id']
    #     print(usuario)

    #     contaTeste = Conta.objects.get(fk_cliente=usuario)
    #     enderecoTeste = Endereco.objects.all()
    #     enderecoTeste.fk_conta = contaTeste.id
    #     print('oioio', enderecoTeste)
    #     return super().list(request, *args, **kwargs)

class CartaoCRUD(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset= Cartao.objects.all()
    serializer_class = CartaoSerializer

    def list(self, request, *args, **kwargs):
        print('aqui')
        id_cliente = dados_usuario(request)
        conta = Conta.objects.get(fk_cliente_id=id_cliente)
        id_conta = conta.id
        cartao_cliente= Cartao.objects.filter(fk_conta_id = id_conta)
        teste = serializers.serialize("json", cartao_cliente.all(), fields = ("numero", "CVV", "data_validade", "nome_titular", "bandeira"))
        # print("mano", cartao_cliente)
        print('meu', teste)
        # cartao_cliente = request.data['fk_conta_id'] = id_conta
        # teste = Cartao.objects.get(fk_cliente_id=id)
        # print('oioio', cartao_cliente)
        # return JsonResponse(teste, safe=False)
        return super().list(request, *args, **kwargs)
    
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