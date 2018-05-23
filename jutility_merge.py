

import os 
folders = ['function','library','api']
directories = [os.path.join(os.getcwd(),i) for i in folders]
#['/Users/chriscruz/Dropbox/Github/jutility/api', '/Users/chriscruz/Dropbox/Github/jutility/function', '/Users/chriscruz/Dropbox/Github/jutility/library']

L = []
print directories
for direct in directories:
	files = [os.path.join(direct,i) for i in os.listdir(direct) if '.js' in i ]
	L.extend(files)


print L 
s = ""
for i in L: 
	with open(i,'r') as f:
	    payload = f.read()
	    divider = "\n//{}\n\n".format(os.path.basename(i))
	    s = s + divider+ payload
print s
# print os.getcwd()
# print os.listdir(os.getcwd())

f = open(os.path.join(os.getcwd(),'jutility.js'), 'w+')
f.write(str(s))
f.close()
