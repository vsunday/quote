const quote = require("./quote");
const sender = require("./sender");

exports.handler = (event, context, callback) => {
    console.log(event['response_url']);
    quote(sender(event['response_url']));
    callback(null, 'done');
};
