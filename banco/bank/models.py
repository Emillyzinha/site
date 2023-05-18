from django.db import models
from django.contrib.auth.models import AbstractUser



class ClienteDoBanco(AbstractUser):
    class Meta:
        verbose_name_plural = "ClienteDoBanco"

    # nome = models.CharField(max_length=255, blank=False)
    data_nascimento = models.DateField(blank=False)
    cpf = models.CharField(max_length=14, blank=False, unique=True)
    numero_telefone = models.CharField(max_length=20, blank=False)
    email = models.EmailField(unique=True, blank=False)
    # senha = models.CharField(max_length=255, blank=False)

    USERNAME_FIELD = "cpf"
    REQUIRED_FIELDS = ["username", "data_nascimento", "numero_telefone", "email", "password"]
