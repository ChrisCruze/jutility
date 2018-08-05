import os
import re
import csv
import StringIO
import requests 
import traceback

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


    def javascript_function_pull(self, page_source, start='function ', end='\(',file_name='None',folder_name="None"):
    	function_list = TextFunctions().string_between_pull_multiple(page_source, start=start, end=end)
    	function_list = [i for i in function_list if i != '']
    	description_list = [page_source.split("\n")[self.line_number_pull_from_file(page_source,i)-1] for i in function_list]
    	function_code_list = self.get_all_function_texts(page_source,function_list)

        l = [{'name':str(function_name),'file_name':file_name,'folder_name':folder_name,'description':str(description)[2:],'code':code}  for function_name,description,code in zip(function_list,description_list,function_code_list)]
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


def download_references(file_name=os.path.join(os.getcwd(),'omni.html')):
    with open(file_name,'r') as f:
        payload = f.read()
    urls_a = TextFunctions().string_between_pull_multiple(payload, start="'", end="'")
    urls_b = TextFunctions().string_between_pull_multiple(payload, start='"', end='"')
    urls = urls_b + urls_a
    urls = [i for i in urls if 'https' in i[:5] and ('.js' in i or '.css' in i)]
    url_file_names = []
    for url in urls: 
        try:
            url_file_name = url.split("/")[-1:][0]
            url_file_name_count = url_file_names.count(url_file_name)

            url_file_names.append(url_file_name)

            extension = url_file_name.split(".")[-1:][0]


            if url_file_name_count > 0: 
                url_file_name = url_file_name.replace(url_file_name.split(".")[0],url_file_name.split(".")[0]+ "_"+ str(url_file_name_count+1))
            new_file_name = os.path.join(os.getcwd(),extension,url_file_name)

            files_in_folder = os.listdir(os.path.join(os.getcwd(),extension))
            # print url_file_name 
            # print new_file_name
            # print files_in_folder
            if True:#url_file_name not in files_in_folder:
                f = open(new_file_name, 'w+')
                page_source = requests.get(url).text
                f.write(page_source)
                #f.write(page_source.encode('ascii', 'ignore'))
                #if url_file_name_count == 0: 

                new_file_reference = extension + "/" + url_file_name
                print url 
                print new_file_reference
                payload = payload.replace(url,new_file_reference)


            else:
                pass
                #print 'already in: {}'.format(str(new_file_name))
            

            # if url_file_name_count == 0: 
            #     new_file_reference = extension + "/" + url_file_name
            #     print url 
            #     print new_file_reference
            #     payload = payload.replace(url,new_file_reference)

        except Exception, err: 
            print url 
            print traceback.format_exc()
        

        f = open(file_name.replace(".html","2.html"), 'w+').write(payload)


#print requests.get('https://cruzco.site44.com/lib/moment.min.js').text()
#download_references()

def run():
    folders = ['function','library','api','app']
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
    	    sub_array = TextFunctions().javascript_function_pull(payload,file_name=os.path.basename(i),folder_name=os.path.basename(os.path.dirname(i)))
    	    array.extend(sub_array)
    	    divider = "\n//{}\n\n".format(os.path.basename(i))
    	    s = s + divider+ payload
    print s

    #array = TextFunctions().javascript_function_pull(s)
    #print array 
    filename = os.path.join(os.getcwd(),'functions.csv')
    CSVFunctions().write(array,filename)

    readme_file_write(array)

    def save_file(directory=os.path.join(os.getcwd(),'jutility.js')):
        f = open(directory, 'w+')
        f.write(str(s))
        f.close()
    save_file()
    save_file(directory="/Users/chriscruz/Dropbox/Github/Dashbot/js/jutility.js")
    save_file(directory="/Users/chriscruz/Dropbox/Github/Stock/js/jutility.js")
    save_file(directory="/Users/chriscruz/Dropbox/Github/Stock/js/jutility.js")

    save_file(directory="/Users/chriscruz/Desktop/Aesop/Aesop/js/jutility.js")
run()
