function guesty_reservation_data_pull_custom(){
  l = guesty_reservation_data_pull()
  l.forEach(guest_reservation_dictionary_customize)
  return l 
}

//determine state if reservation is current
function guest_state_determine(item){
  is_present = moment(item['checkIn']) <= moment() && moment() <= moment(item['checkOut']) 
  if (is_present){
    return 'current'
  }
  else {
    return 'not current'
  }
}


//using the information from guesty we are able to dictionary items
function guest_reservation_dictionary_customize(item,index){
    price = item['money']['netIncome']
    days_difference = Math.round((new Date(item['checkOut']) - new Date(item['checkIn']))/(1000*60*60*24)) 
    revenue_per_day = price/days_difference
    run_rate = revenue_per_day * 30
    guest_name = item.guest.fullName
    price = parseInt(price)||0
    revenue_per_day = parseInt(revenue_per_day)||0
    run_rate = parseInt(run_rate)||0
    room=item.listing.nickname
    days_from_now = Math.round((new Date(item['checkOut']) - new Date())/(1000*60*60*24)) 
    
    item['days_from_now'] = days_from_now
    item['days_from_now_absolute'] = Math.abs(days_from_now)
    item['days_difference'] = days_difference
    item['revenue_per_day'] = revenue_per_day
    item['run_rate'] = run_rate
    item['guest_name'] = guest_name
    item['listing_nick_name'] = item.listing.nickname||'null'
    item['listing_title'] = item.listing.title||'null'
    item['account_name'] = item.integration.object.nickname||'null'
    item['state'] = guest_state_determine(item)
    item['DT_RowId'] = item._id

    is_3009 = item['listing']['nickname'].indexOf("2608") != -1
    is_401 = item['listing']['nickname'].indexOf("401") != -1
    is_1806 = item['listing']['nickname'].indexOf("1806") != -1
    if (is_3009){
      item['room_number'] = '2608'
    }
    else if (is_401){
      item['room_number'] = '401'
    }
    else if (is_1806){
      item['room_number'] = '1806'
    }
    else{
      item['room_number'] = 'N/A'

    }
  }



// The below function pulls the data from the guesty
function guesty_reservation_data_pull(){
    key = '57b6349a1f211d3c4b2b4c886c5632c7'
    secret = '1b8e3bd1f42ce6b054868cd47dc0412f'
    reservations_url = 'https://superhostuser.herokuapp.com/api/v2/reservations'
    results = $.ajax
    ({
      type: "GET",
      url: reservations_url,
      dataType: 'json',
      async: false,
      data: {'viewId':'5616071779035e0e0096290c'},
      headers: {
        "Authorization": "Basic " + btoa(key + ":" + secret)
    }
    });
    return results.responseJSON.results
    }


function guesty_listing_data_pull(){
  response_result = $.ajax({type: "GET",
  url: 'https://superhostuser.herokuapp.com/api/v2/listings',
  dataType: 'json',
  async: false,
  headers: { "Authorization": "Basic " + btoa("57b6349a1f211d3c4b2b4c886c5632c7:1b8e3bd1f42ce6b054868cd47dc0412f")},
  data: {limit:50}
});
  array = response_result.responseJSON.results
  array.forEach(function(D){D['nickname'] = D['nickname']||'null'})
  return array 
}

function guesty_integration_data_pull(){
  json_response =  $.ajax({type: "GET",
    url: 'https://superhostuser.herokuapp.com/api/v2/integrations',
    dataType: 'json',
    async: false,
    headers: { "Authorization": "Basic " + btoa("57b6349a1f211d3c4b2b4c886c5632c7:1b8e3bd1f42ce6b054868cd47dc0412f")},
    data: {limit:25}
  }).responseJSON
  return json_response.results
}


//create url for reservation for datatables functions
function guesty_reservations_inbox_url_create(td, cellData, rowData, row, col) {
  url = "https://app.guesty.com/reservations/" + rowData.guestId + "/inbox";
  new_url = "<a href='" + url + "'>" + cellData + "</a>";
  console.log(new_url);
  return new_url;
}

//create user airbnb url for data tables
function guest_airbnb_url_create(data, type, row, meta) {
  url = "https://www.airbnb.com/users/show/" + row.id + "";
  data = '<a target="_blank"  href="' + url + '">' + data + "</a>";
  return data;
}
