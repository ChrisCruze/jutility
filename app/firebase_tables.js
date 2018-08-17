function receipts_table(){
	function callback_function(data){
		data.forEach(function(D){D['cost'] = D['file_name'].split(' ')[0] })
		val = sum_float_convert_from_array_underscore(data,'cost').toFixed(1)
		$("#expense_cost").html(val)
	}
	params = datatables_firebase({
			    firebase_reference:dbRef.ref('receipts'),
			    table_selector:"#expense_table",
			    columns_generate:true,
			    default_visible:false,
			    callback_function:null,
			    callback_function:callback_function,
			    columns: [
			    	{'data':'direct_media_link','visible':false},

			    	{'data':'file_name','visible':true},
			    	{'data':'dropbox_link','visible':false},
			    	{'data':'evernote_url','visible':false},
			    	{'data':'time_created','visible':true,format:'date_adjust'},
			        ],
			    //sort:'start_time',
			    //callback_function:visits_callback,

			})
	return params

}


function food_table(){
	function callback_function(data){
		data.forEach(function(D){D['calories'] = D['file_name'].split(' ')[0] })
		caloric_intake = sum_float_convert_from_array_underscore(data,'calories')
		$("#caloric_intake").html(caloric_intake)
	}
	params = datatables_firebase({
			    firebase_reference:dbRef.ref('food'),
			    table_selector:"#food_table",
			    columns_generate:true,
			    default_visible:false,
			    callback_function:callback_function,
			    columns: [
			    	{'data':'direct_media_link','visible':false},
			    	{'data':'file_name','visible':true},
			    	{'data':'dropbox_link','visible':false},
			    	{'data':'evernote_url','visible':false},
			    	{'data':'time_created','visible':true,format:'date_adjust'},
			        ]
			})
	return params
}



function stock_table(){
	var ref = firebase.database().ref('blogs').child('test_user').child('data').child('stocks').child('data')




function update_stock_data(){
    table_data = $("#stocks_table").DataTable().data().toArray()
    stock_symbols = _.map(table_data,function(D){return D['symbol'].toUpperCase()})
    live_stock_data = stocks_batch_pull(stock_symbols)
    console.log(live_stock_data)
    combined_stock_data = _.map(table_data,function(D){

        live_stock_dict = live_stock_data[D['symbol'].toUpperCase()]
        if (live_stock_dict != undefined){
            live_stock_dict_formatted = combine_dicts(live_stock_dict.stats,live_stock_dict.quote)
            live_stock_dict_formatted = combine_dicts(live_stock_dict_formatted,live_stock_dict.news[0])
            return combine_dicts(D,live_stock_dict_formatted)
        }
        else {
            console.log('ERROR')
            console.log(D)
        }

    })
    console.log(combined_stock_data)
    combined_stock_data.forEach(function(D){
        if (D != undefined){
            D.last_update = moment().format()
         console.log(D)
        ref.child(D['DT_RowId']).set(D)

        }

    })
}


function stocks_table(user){
    return datatables_firebase({
        table_selector:"#stocks_table",
        firebase_reference:ref,
        columns:[
            {data:'symbol',visible:true},
            {data:'average_cost',visible:true},
            {data:'latestPrice',visible:true},
            {data:'shares',visible:true},
            {data:'share_return',title:'share_return',render:function(data,type,row,meta){
                r = parseFloat(row.latestPrice) - parseFloat(row.average_cost)
                r = r.toFixed(2)
                return r 
            }},
            {data:'total_share_return',title:'total_share_return',render:function(data,type,row,meta){
                r = parseFloat(row.latestPrice) - parseFloat(row.average_cost)
                r = r * parseFloat(row.shares)
                r = r.toFixed(2)
                return r//.share_return
            }},
            {data:'last_update',visible:true,format:'date'},
            {data:'headline',visible:false,className:"10"},
            'cash',
            'equity',
            'name',
            'price',
            'time_stamp',
            'total_return',
            'DT_RowId',
            'assets',
            'liability','debt','net_current_assets','deficit','last_year_earnings','net_tangible_assets','annual_report','multiplier_of_record_earnings','management_efficiency','stakeholder_recognition','competitors'],
        columns_generate:true,
        default_visible:false,
        live:true,
        additional_buttons: [{text: 'Update',name:'Update', action: function ( e, dt, node, config ) {
            update_stock_data()
        }}]
    })
}

return stocks_table()
}