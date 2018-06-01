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
    
    def get_all_function_texts(self,page_source,function_list):
        page_lines = page_source.split("\n")

        line_numbers = [self.line_number_pull_from_file(page_source,i)-1 for i in function_list]
        def create_line_number_tup(line_number,enum):
            try:
                next_line_number = line_numbers[enum+1]
            except:
                next_line_number = len(page_lines)

            function_page_lines = page_lines[line_number:next_line_number-1]
            return "<br>".join(function_page_lines)

        function_text = [create_line_number_tup(i,enum) for enum,i in enumerate(line_numbers)]
        return function_text


    def javascript_function_pull(self, page_source, start='function ', end='\(',file_name='None'):
    	function_list = TextFunctions().string_between_pull_multiple(page_source, start=start, end=end)
    	function_list = [i for i in function_list if i != '']
    	description_list = [page_source.split("\n")[self.line_number_pull_from_file(page_source,i)-1] for i in function_list]
    	function_code_list = self.get_all_function_texts(page_source,function_list)

        l = [{'name':str(function_name),'file_name':file_name,'description':str(description)[2:],'code':code}  for function_name,description,code in zip(function_list,description_list,function_code_list)]
    	return l 



def readme_file_write(function_array):

	line_func = lambda enum,D: """| {} | [{}](http://cruzco.site44.com/streak.html) | {} | {}|""".format(str(enum+1),D['name'],D['file_name'],D['description'])
	#page_source = "\n".join(["{}. {} - {}".format(str(enum+1),D['name'],D['description']) for enum,D in enumerate(function_array)])
	page_source = "\n".join([line_func(enum,D) for enum,D in enumerate(function_array)])

	readme_filename = os.path.join(os.getcwd(),'README.MD')
	f = open(readme_filename, 'w+')

	header_source = """| # | Function | File | Definition |\n|---|:----|---|-------------|\n"""

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

array = []
s = ""
for i in L: 
	with open(i,'r') as f:
	    payload = f.read()
	    sub_array = TextFunctions().javascript_function_pull(payload,file_name=os.path.basename(i))
	    array.extend(sub_array)
	    divider = "\n//{}\n\n".format(os.path.basename(i))
	    s = s + divider+ payload
print s

#array = TextFunctions().javascript_function_pull(s)
#print array 
filename = os.path.join(os.getcwd(),'functions.csv')
CSVFunctions().write(array,filename)

readme_file_write(array)


f = open(os.path.join(os.getcwd(),'jutility.js'), 'w+')
f.write(str(s))
f.close()
