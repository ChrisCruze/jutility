from text_functions import TextFunctions

import os 


def directories_get():
	folders = ['function','library','api','app']
	directories = [os.path.join(os.getcwd(),i) for i in folders]
	L = []
	for direct in directories:
		files = [os.path.join(direct,i) for i in os.listdir(direct) if '.js' in i ]
		L.extend(files)
	return L 




def javascript_functions_read_process(i):
	s = ""
	with open(i,'r') as f:
		payload = f.read()
		sub_array = TextFunctions().javascript_function_pull(payload,file_name=os.path.basename(i),folder_name=os.path.basename(os.path.dirname(i)))
		array.extend(sub_array)
		divider = "\n//{}\n\n".format(os.path.basename(i))
		s = s + divider+ payload
	return s 


s = "/Users/chriscruz/Dropbox/Github/jutility/function/file_functions.js"
javascript_functions_read_process(s)