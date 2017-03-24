# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-13 21:52
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('questions', '0004_post_parent_post'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='supporters',
            field=models.ManyToManyField(related_name='supported', to=settings.AUTH_USER_MODEL),
        ),
    ]