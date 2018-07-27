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


  function stocks_batch_pull(stocks){
    stocks_string = stocks.join(",")
    url = "https://api.iextrading.com/1.0/stock/market/batch?symbols="+stocks_string+"&types=quote,stats,news,chart&range=1m&last=5"
    l = $.ajax({
      url: url,
      method: "GET",
      async:false,
      headers: {"Accept":"application/json; odata=verbose"}
    })
    results = l.responseJSON
    return results
  }


  ///stock/market/batch?symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5
  //    url = url||"https://api.iextrading.com/1.0/stock/market/batch?symbols=PZZA&types=quote,news,chart&range=1m&last=5"
