# Generated by Django 4.2.1 on 2023-05-16 18:41

import django.contrib.auth.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0004_remove_clientedobanco_username_clientedobanco_nome'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientedobanco',
            name='nome',
        ),
        migrations.AddField(
            model_name='clientedobanco',
            name='username',
            field=models.CharField(default=1, error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username'),
            preserve_default=False,
        ),
    ]