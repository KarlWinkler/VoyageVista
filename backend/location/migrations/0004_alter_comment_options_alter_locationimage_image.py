# Generated by Django 4.2.11 on 2024-04-01 01:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('location', '0003_alter_comment_location_alter_comment_user_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterField(
            model_name='locationimage',
            name='image',
            field=models.ImageField(upload_to='media/'),
        ),
    ]
