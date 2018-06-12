// get sum from array with key
function sum_float_convert_from_array_underscore(arr,key_name) { 
  // returns the sum total of all values in the array
  return _.reduce(arr, function(memo, num) { 
    r = memo + (parseFloat(num[key_name])||0)
    return r 
  }, 0); 
}

//group by an array
function group_by_underscore(gspread_array_data){
	_.groupBy(gspread_array_data,'status')['Red']||[]
}