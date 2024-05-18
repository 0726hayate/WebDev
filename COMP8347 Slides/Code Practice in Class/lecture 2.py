###Create a file
f = open('dummy.txt','w')
#print(type(f))

###Append a file
##f = open('dummy.txt','a')

#Write in the file
for i in range(5):
    f.write('+++++++++++This is a new dummy file \n')

#Read from the file
f = open('dummy.txt','r')
for i in f:
    data = i.strip('+ \n')
    print(data)
#print(f.readline(5))

#Close the file
f.close()
