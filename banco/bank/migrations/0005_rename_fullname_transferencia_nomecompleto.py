# Generated by Django 4.2.1 on 2023-05-29 19:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0004_transferencia_fullname'),
    ]

    operations = [
        migrations.RenameField(
            model_name='transferencia',
            old_name='fullName',
            new_name='nomeCompleto',
        ),
    ]
