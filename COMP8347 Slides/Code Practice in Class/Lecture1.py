Python 3.10.1 (tags/v3.10.1:2cd268a, Dec  6 2021, 19:10:37) [MSC v.1929 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license()" for more information.
list = [1,2,'hi']
list[1]
2
list[1]=5
print(list)
[1, 5, 'hi']
list1 = [3,4,'bye']
list1 = (3,4,'bye')
list1[1]=6
Traceback (most recent call last):
  File "<pyshell#6>", line 1, in <module>
    list1[1]=6
TypeError: 'tuple' object does not support item assignment
len(list1)
3
str = 'hello usama'
str[0]
'h'
str[0:5]
'hello'
str[0]='m'
Traceback (most recent call last):
  File "<pyshell#11>", line 1, in <module>
    str[0]='m'
TypeError: 'str' object does not support item assignment
str = 'bye usama'
print(str)
bye usama
str.split()
['bye', 'usama']
str.upper()
'BYE USAMA'
str.find('r')
-1
str.index('r')
Traceback (most recent call last):
  File "<pyshell#17>", line 1, in <module>
    str.index('r')
ValueError: substring not found
