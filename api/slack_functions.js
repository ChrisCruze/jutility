



//slack_push({'text':"<http://aesopba.com/bug_features.html|New Bug Feature: "+message+">",'channel':"CBJFKKB35"})
function slack_post_message(text,channel){
  slack_token = "1111000 1101111 1111000 1110000 101101 110011 110101 110100 110111 110110 111000 110001 110000 110100 110000 111001 110110 101101 110011 110101 110101 110010 110011 111000 110101 110111 110000 111001 110011 110010 101101 110011 110101 110111 110001 110100 110001 110000 110000 110101 110010 110111 110000 101101 110100 1100010 111001 110010 111001 110100 110001 110101 110000 110011 110100 110000 110011 110001 110111 110101 1100101 1100011 1100011 111000 1100010 110110 111001 110001 111001 110111 1100011 110111 110101 111001 110111 110100"
  channel = channel||"CBJFKKB35"//CAFB12X8T
  //chat_url = "<https://chriscruze.github.io/Aesop/admin.html?viewer=Aesop&id="+String(chat_id)+"|New Website Message: "+message+">"
  r = $.ajax({type: "POST",
    url: "https://slack.com/api/chat.postMessage",
    dataType: 'json',
    async: false,
    data: {"channel":channel,
    "username":"Chat",
    "text":text,
    "token":binary_to_string(slack_token)}
    });
  console.log(r)
}
