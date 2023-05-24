from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from random import randint

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(("The e-mail must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()

        numero_conta = ''
        for i in range(0,9):
            num_alea = str(randint(0,9))
            numero_conta += num_alea

        Conta.objects.create(fk_cliente=user, agencia='0801', numero=numero_conta, status=True, tipo='C', saldo=2000)
        return user

class Cliente(AbstractUser):
    # class Meta:
        # verbose_name_plural = "ClienteDoBanco"

    nomeCompleto = models.CharField(max_length=255, blank=False)
    data_nascimento = models.DateField(blank=False)
    cpf = models.CharField(max_length=14, blank=False, unique=True)
    numero_telefone = models.CharField(max_length=20, blank=False)
    email = models.EmailField(unique=True, blank=False)
    # senha = models.CharField(max_length=255, blank=False)

    USERNAME_FIELD = "cpf"
    REQUIRED_FIELDS = ["nomeCompleto", "username", "data_nascimento", "numero_telefone", "email", "password"]

    objects = CustomUserManager()

class Conta(models.Model):
    CORRENTE = 'C'
    SALARIO = 'S'
    PAGAMENTO = 'P'

    tipos_conta = (
        (CORRENTE, 'Corrente'),
        (SALARIO, 'Salário'),
        (PAGAMENTO, 'Pagamento')
    )

    agencia = models.CharField(max_length=4)
    numero = models.IntegerField(unique=True)
    # limite = 
    status = models.BooleanField()
    tipo = models.CharField(max_length=1, choices=tipos_conta, default=CORRENTE)
    saldo = models.IntegerField()
    fk_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)

class Endereco(models.Model):
    # CADE O ADMIN
    pais = models.CharField(max_length=255)  
    estado = models.CharField(max_length=255)  
    cidade = models.CharField(max_length=255)  
    bairro = models.CharField(max_length=255)  
    logradouro = models.CharField(max_length=255)  
    numero = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    fk_conta = models.ForeignKey(Conta, on_delete=models.CASCADE)

class Cartao(models.Model):
    numero = models.IntegerField()
    CVV = models.IntegerField()
    data_validade = models.IntegerField()
    nome_titular = models.IntegerField()
    fk_conta = models.ForeignKey(Conta, on_delete=models.CASCADE)
