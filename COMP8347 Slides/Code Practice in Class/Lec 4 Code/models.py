from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=50,primary_key=True)
    length = models.PositiveIntegerField()
    website = models.URLField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']

class Author(models.Model):
    AUTHOR_SEX = [('M','Male'),('F','Female')]
    name = models.CharField(max_length=50)
    book = models.ManyToManyField(Book)
    gender = models.CharField(max_length=1,choices=AUTHOR_SEX,default='M')

    def __str__(self):
        return self.name


