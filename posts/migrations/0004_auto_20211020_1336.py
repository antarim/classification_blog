# Generated by Django 3.2.8 on 2021-10-20 10:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_auto_20211020_1255'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='updated_at',
            new_name='updated',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='updated_at',
            new_name='updated',
        ),
    ]