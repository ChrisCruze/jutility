import os 
import re 
import traceback


parent_directory = os.path.join(os.getcwd(),'advent')
html_files = [os.path.join(parent_directory,i) for i in os.listdir(parent_directory) if '.html' in i ]


css_parent = os.path.join(os.getcwd(),'advent','assets','css')
css_files = [os.path.join(parent_directory,i) for i in os.listdir(parent_directory) if '.css' in i  and '.min.css' not in i]


def string_between_pull_multiple(val, start='function ', end='\('):
    try:
        regex = start + '(.*?)' + end
        val = re.findall(regex, val, re.IGNORECASE)
        return val
    except AttributeError:  #if no parenthesis
        return val


def css_pull(page_source, start='function ', end='\(',file_name='None',folder_name="None"):
	css = TextFunctions().string_between_pull_multiple(page_source, start='.', end=' \{')


def css_pull_from_file_name(file_name):
	with open(file_name,'r') as f:
		page_source = f.read()	
	#css_classes = string_between_pull_multiple(page_source, start='.', end=' \{')
	css_classes = string_between_pull_multiple(page_source, start='\.', end=' ')
	css_classes = [i for i in css_classes if ' ' not in i and i != '']
	css_classes = [i if '.' != i[0] else i[1:] for i in css_classes]
	return css_classes


def class_pull_from_html_file(file_name):
	with open(file_name,'r') as f:
		page_source = f.read()	
	css_classes = string_between_pull_multiple(page_source, start='class\=\"', end='\"')
	#css_classes = [i for i in css_classes if ' ' not in i]
	css_classes_uniques = []
	for css_class in css_classes:
		css_classes_uniques.extend(css_class.split(" "))
	css_classes_uniques = list(set(css_classes_uniques))

	return css_classes_uniques


def page_source_update(index_html_file,intersection):
	with open(index_html_file,'r') as f:
		html_page_source = f.read()	
		css_classes_from_html = string_between_pull_multiple(html_page_source, start='class\=\"', end='\"')
		class_format = lambda i: 'class="{}"'.format(i)

		for class_string in css_classes_from_html: 
			class_string_put_back = []
			for class_string_instance in class_string.split(' '):
				for intersector in intersection:
					if intersector == class_string_instance: 
						class_string_instance = class_string_instance + "_advent"
						break 
					else:
						pass 

				class_string_put_back.append(class_string_instance)
			new_class_name = ' '.join(class_string_put_back)
			html_page_source = html_page_source.replace(class_format(class_string),class_format(new_class_name))
		
		html_page_source = html_page_source.replace('href="assets/css/style.css"','href="assets/css/style_v2.css"')		
		html_page_source = html_page_source.replace('<script type="text/javascript" src="assets/js/custom.js"></script>','<script type="text/javascript" src="assets/js/custom_v2.js"></script>')
		f = open(index_html_file.replace(".html","_v2.html"), 'w+').write(html_page_source)
		return html_page_source


def intersection_check_rename():
	index_html_file = os.path.join(os.getcwd(),'advent','index.html')
	html_classes =  class_pull_from_html_file(index_html_file)

	index_html_file2 = os.path.join(os.getcwd(),'advent','index-2.html')
	html_classes_2 =  class_pull_from_html_file(index_html_file2)



	index_html_file3 = os.path.join(os.getcwd(),'advent','index-signup.html')
	html_classes_3 =  class_pull_from_html_file(index_html_file3)


	index_html_file4 = os.path.join(os.getcwd(),'advent','index-form.html')
	html_classes_4 =  class_pull_from_html_file(index_html_file4)

	html_classes = html_classes + html_classes_2 + html_classes_3 + html_classes_4




	style_css_file = os.path.join(os.getcwd(),'advent','assets','css','style.css')
	css_classes = css_pull_from_file_name(style_css_file)


	intersection = list(set(html_classes).intersection(css_classes))

	page_source_update(index_html_file2,intersection)
	page_source_update(index_html_file,intersection)
	page_source_update(index_html_file3,intersection)
	page_source_update(index_html_file4,intersection)


	with open(style_css_file,'r') as f:
		css_page_source = f.read()	
		for css_name in intersection:
			css_page_source = css_page_source.replace('.'+ css_name + ' ','.'+ css_name+"_advent ")
			css_page_source = css_page_source.replace('.'+ css_name + ':','.'+ css_name+"_advent:")
			css_page_source = css_page_source.replace('.'+ css_name + '.','.'+ css_name+"_advent.")


	js_file = os.path.join(os.getcwd(),'advent','assets','js','custom.js')

	with open(js_file,'r') as f:
		js_page_source = f.read()	
		for css_name in intersection:
			js_page_source = js_page_source.replace('.'+ css_name + '','.'+ css_name+"_advent")
			#css_page_source = css_page_source.replace('.'+ css_name + ':','.'+ css_name+"_advent:")
			#css_page_source = css_page_source.replace('.'+ css_name + '.','.'+ css_name+"_advent.")




		f = open(js_file.replace(".js","_v2.js"), 'w+').write(js_page_source)

	# with open(style_css_file,'r') as f:
	# 	page_source = f.read()

intersection_check_rename()
# def css_files_process(css_files,html_files):
# 	for file_name in css_files:
# 		with open(file_name,'r') as f:
# 			payload = f.read()
		



	# function_list = [i for i in function_list if i != '']
	# description_list = [page_source.split("\n")[self.line_number_pull_from_file(page_source,i)-1] for i in function_list]
	# function_code_list = self.get_all_function_texts(page_source,function_list)

 #    l = [{'name':str(function_name),'file_name':file_name,'folder_name':folder_name,'description':str(description)[2:],'code':code}  for function_name,description,code in zip(function_list,description_list,function_code_list)]
	# return l 
