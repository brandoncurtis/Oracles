const Web3 = require("web3");
const fs = require('fs');
const Tx = require('ethereumjs-tx')
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"));


var dateTime = require('node-datetime');
var dt = dateTime.create();
var date = dt.format('Ymd');
var namedata = 'ETHUSD'

//var columns = [,'time','date','price','Bitfinex','GDAX','BITSTAMP','Poloniex','Gemini']
var people = [];
var fileContents = fs.readFileSync("C:/Code/company/Oracle/Data/eth_"+date+".csv");
var lines = fileContents.toString().split('\n');

for (var i = 0; i < lines.length; i++) {
    people.push(lines[i].toString().split(','));
}

for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < 3; j++) {
    }
    //console.log('\n');
}


var dailyval = parseInt(people[1][3].replace(/\n/g, ''));


console.log(dailyval)
console.log(namedata)
console.log(date)


var abi = [{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"documentStructs","outputs":[{"name":"name","type":"bytes32"},{"name":"value","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"key","type":"bytes32"}],"name":"RetrieveData","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"key","type":"bytes32"}],"name":"RetrieveName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"key","type":"bytes32"},{"name":"name","type":"bytes32"},{"name":"value","type":"uint256"}],"name":"StoreDocument","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_name","type":"string"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Print","type":"event"}];
var contractAddress ="0xc78fe159230e4bab28c3f7cba53967e0be3ee48e";
var _ = require('lodash');
var SolidityFunction = require('web3/lib/web3/function');
var solidityFunction = new SolidityFunction('', _.find(abi, { name: 'StoreDocument' }), '');


var account1= "0xE5078b80b08bD7036fc0f7973f667b6aa9B4ddBE";
var key1 = new Buffer('d941dcf24a8841fda45f3b0e52d2987a1f9131233caa3a0566b0c91910af85af', 'hex');

var gasLimitHex = web3.toHex(3000000);
var gasPrice = 50000000000;
var gprice = web3.toHex(gasPrice);

var numbernon=  web3.eth.getTransactionCount(account1) ;
var nonceHex = web3.toHex(numbernon);
var payloadData = solidityFunction.toPayload([web3.fromAscii(date),namedata,dailyval]).data;
console.log(payloadData)


var rawTx = {
    nonce: nonceHex,
    gasPrice: gprice,
    gasLimit: gasLimitHex,
    to:contractAddress,
    data: payloadData,
    chainId:3
};

console.log(rawTx)
/*
{"nonce":"0x2e","gasPrice":"0x04e3b29200","gasLimit":"0x14b40f","to":"0x8d3cbc2cba343b97f656428eafa857ee01bda53b","value":"0x2386f26fc10000","data":"0x412a5a6d","chainId":3}


{gas: '0x2dc6c0',\n  to: '0x8d3cbc2cba343b97f656428eafa857ee01bda53b',\n  from: '0xE5078b80b08bD7036fc0f7973f667b6aa9B4ddBE',\n  value: '0x2386f26fc10000',\n  data: '0x412a5a6d' }

*/


var tx = new Tx(rawTx);
tx.sign(key1);

var serializedTx = tx.serialize();

web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
    if (err) {
        console.log('send raw Error:');
        console.log(err);
    }
    else {
        console.log('Transaction receipt hash pending');
        console.log(hash);
    }
});

console.log(web3.fromAscii(date))
/*
var stream = fs.createWriteStream("my_file.csv");
stream.once('open', function(fd) {
  stream.write('woohoo new doc');
  /*stream.write("TransactionOccured",hash);
  stream.write("Contract Created at: ",newAddress);
  stream.end();
});
****/