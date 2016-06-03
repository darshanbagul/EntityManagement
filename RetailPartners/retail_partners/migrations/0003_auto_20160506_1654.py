# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-05-06 16:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('retail_partners', '0002_auto_20160505_1942'),
    ]

    operations = [
        migrations.RenameField(
            model_name='retailpartnercategory',
            old_name='email',
            new_name='category_name',
        ),
        migrations.AddField(
            model_name='retailpartnercategory',
            name='status',
            field=models.IntegerField(default=3),
            preserve_default=False,
        ),
    ]
