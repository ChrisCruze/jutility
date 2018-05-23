function delete_tasks_duplicate(){
    //r = Object.values(_.groupBy(current_tasks,'content')).filter(function(l){return l.length >1})
current_tasks.forEach(function(D){D['content'] =D['content'].replace("-","")})
  r = Object.values(_.groupBy(current_tasks,'content')).filter(function(l){return l.length >1})
  //inbox_tasks = current_tasks.filter(function(D){return D['project_id'] == 2159896038})//urr
  //
//inbox_tasks.forEach(function(D){todoist_delete_task(D.id)})
  r.forEach(function(subli){
    subli.shift()
    subli.forEach(function(i){
      console.log(i)
          todoist_delete_task(i.id)

    })
    
  })
}
