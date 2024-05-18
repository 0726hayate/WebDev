from django.http import HttpResponse
from .models import Author
from django.shortcuts import get_object_or_404

def home(request):
    authors = Author.objects.all()
    return HttpResponse(authors)

    # path = request.path
    # method1 = request.method
    # agent = request.META['HTTP_USER_AGENT']
    #ipaddr = request.META['REMOTE_ADDR']
    #return HttpResponse('<center><p> The answer is:' + path + '</p>' +
    #                   '<p> The answer is:' + method1 + '</p>' +
                        #'<p> The answer is:' + agent + '</p>' +
    #                   '<p> The answer is:' + ipaddr + '</p></center>)

def authordetails(request, author_id):
    obj = get_object_or_404(Author, pk = author_id)
    return HttpResponse(obj)