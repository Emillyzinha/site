# Generated by Django 4.2.1 on 2023-05-28 02:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0002_emprestimo'),
    ]

    operations = [
        migrations.RenameField(
            model_name='emprestimo',
            old_name='conta',
            new_name='fk_conta',
        ),
    ]
