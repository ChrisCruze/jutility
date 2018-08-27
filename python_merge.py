import os 



class TextFunctions(FunctionMethodName):
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


    def javascript_function_pull(self, page_source, start='function ', end='\(',file_name='None',folder_name="None"):
        function_list = TextFunctions().string_between_pull_multiple(page_source, start=start, end=end)
        function_list = [i for i in function_list if i != '']
        description_list = [page_source.split("\n")[self.line_number_pull_from_file(page_source,i)-1] for i in function_list]
        function_code_list = self.get_all_function_texts(page_source,function_list)
        l = [{'name':str(function_name),'file_name':file_name,'folder_name':folder_name,'description':str(description)[2:],'code':code}  for function_name,description,code in zip(function_list,description_list,function_code_list)]
        return l 




def directories_get(directory="/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/site-packages/Shippy/"):
	folders = ['Functions']
	directories = [os.path.join(directory,i) for i in folders]
	L = []
	for direct in directories:
		files = [os.path.join(direct,i) for i in os.listdir(direct) if i[-3:] == '.py' and '__init__' not in i]
		L.extend(files)
	return L 

def read_process_combine(i,split_key="#"):
	s = ""
	array = []
	with open(i,'r') as f:
		payload = f.read()
		#sub_array = TextFunctions().javascript_function_pull(payload,file_name=os.path.basename(i),folder_name=os.path.basename(os.path.dirname(i)))
		#array.extend(sub_array)
		divider = "\n{}{}\n\n".format(split_key,os.path.basename(i))
		s = s + divider+ payload
	return s#, array 


def combine_files(directory=os.path.join(os.getcwd(),'jutility.py')):
	directories = directories_get()
	page_source = ""
	for i in directories:
		page_source = page_source + read_process_combine(i)

	f = open(directory, 'w+')
	f.write(str(page_source))
	f.close()

combine_files()
print directories_get()

