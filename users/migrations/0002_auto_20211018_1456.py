# Generated by Django 3.2.8 on 2021-10-18 11:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='creator',
        ),
        migrations.RemoveField(
            model_name='post',
            name='parent_blog',
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
        migrations.DeleteModel(
            name='Post',
        ),
    ]