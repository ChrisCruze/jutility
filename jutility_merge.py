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
    	description_list = [page_source.split("\n")[self.line_number_pull_from_file(page_source,i)-1] for i in function_list]
    	l = [{'name':str(function_name),'description':str(description)}  for function_name,description in zip(function_list,description_list)]
    	return l 






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
filename = os.path.join(os.getcwd(),'functions.csv')
print filename
CSVFunctions().write(array,filename)


f = open(os.path.join(os.getcwd(),'jutility.js'), 'w+')
f.write(str(s))
f.close()
