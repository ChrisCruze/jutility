import os
import re
import csv
import StringIO

class CSVFunctions(object):
    def write(self, lst, filename,sort=True,first_key=None):
        keys = lst[0].keys()
        f = open(filename, 'wb')
        dict_writer = csv.DictWriter(f, keys)
        dict_writer.writer.writerow(keys)

        try:
            dict_writer.writerows(lst)
        except UnicodeEncodeError:
            dict_writer.writerows(lst)


class TextFunctions(object):
    # cancel out special characters
    def string_between_pull_multiple(self, val, start='function ', end='\('):
        try:
            regex = start + '(.*?)' + end
            val = re.findall(regex, val, re.IGNORECASE)
            return val
        except AttributeError:  #if no parenthesis
            return val

    def line_number_pull_from_file(self, page_source, function_name, start='function ', end='\('):
    	for enum,line in enumerate(page_source.split("\n")):
    		formatted_function_name = "function {}(".format(function_name)
    		if formatted_function_name in line:
    			return enum
    			break 
    	return 0
          
    def javascript_function_pull(self, page_source, start='function ', end='\('):
    	function_list = TextFunctions().string_between_pull_multiple(page_source, start=start, end=end)
    	function_list = [i for i in function_list if i != '']
    	description_list = [page_source.split("\n")[self.line_number_pull_from_file(page_source,i)-1] for i in function_list]
    	l = [{'name':str(function_name),'description':str(description)[2:]}  for function_name,description in zip(function_list,description_list)]
    	return l 



def readme_file_write(function_array):

	line_func = lambda enum,D: """| {} | [{}](http://cruzco.site44.com/streak.html) | {}|""".format(str(enum+1),D['name'],D['description'])
	#page_source = "\n".join(["{}. {} - {}".format(str(enum+1),D['name'],D['description']) for enum,D in enumerate(function_array)])
	page_source = "\n".join([line_func(enum,D) for enum,D in enumerate(function_array)])

	readme_filename = os.path.join(os.getcwd(),'README.MD')
	f = open(readme_filename, 'w+')

	header_source = """| # | Behavior | Metric |
	|---|:------|-------------|\n"""

	page_source = header_source + page_source

	f.write(str(page_source))
	f.close()



folders = ['function','library','api']
directories = [os.path.join(os.getcwd(),i) for i in folders]
#['/Users/chriscruz/Dropbox/Github/jutility/api', '/Users/chriscruz/Dropbox/Github/jutility/function', '/Users/chriscruz/Dropbox/Github/jutility/library']

L = []
print directories
for direct in directories:
	files = [os.path.join(direct,i) for i in os.listdir(direct) if '.js' in i ]
	L.extend(files)


s = ""
for i in L: 
	with open(i,'r') as f:
	    payload = f.read()
	    divider = "\n//{}\n\n".format(os.path.basename(i))
	    s = s + divider+ payload
print s

array = TextFunctions().javascript_function_pull(s)
print array 
filename = os.path.join(os.getcwd(),'functions.csv')
CSVFunctions().write(array,filename)

readme_file_write(array)


f = open(os.path.join(os.getcwd(),'jutility.js'), 'w+')
f.write(str(s))
f.close()
