from django.contrib import admin
from django.db import models
from .models import Book, Author

# Register your models here.
admin.site.register(Book)
admin.site.register(Author)
#admin.site.register(Employee)


