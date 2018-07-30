const request = require("request");

let wrap = {
  url: '',
  send: function(data) {
    const options = {
      'url': this.url,
      'headers': {
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({'text': data})
    };
    console.log('request_url: ' + this.url);
    request.post(options, (error, response, body) => {
      if (error) throw error;
      // console.log(response);
    });
    console.log('posted');
  }
};

module.exports = (response_url) => { 
  return wrap.send.bind({url: response_url});
};