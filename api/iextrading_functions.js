//https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5
//https://iextrading.com/developer/docs/#batch-requests


function stock_pull(url){
    url = url||"https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,news,chart&range=1m&last=5"
    l = $.ajax({
      url: url,
      method: "GET",
      async:false,
      headers: {"Accept":"application/json; odata=verbose"}
    })
    results = l.responseJSON
    return results
  }


  function stock_pull(url){
    url = url||"https://api.iextrading.com/1.0/stock/market/batch?symbols=PZZA&types=quote,news,chart&range=1m&last=5"
    l = $.ajax({
      url: url,
      method: "GET",
      async:false,
      headers: {"Accept":"application/json; odata=verbose"}
    })
    results = l.responseJSON
    return results
  }