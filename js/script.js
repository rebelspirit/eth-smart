$(document).ready(function () {
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/metamask"));
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"lowPersent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stepHigh","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"charityPercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"projectFund","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"payoutAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"chargingTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"charityFund","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stepLow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countOfCharity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stepMiddle","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"highPersent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"persentRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"userDeposit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"middlePersent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countOfInvestors","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"persentWithdraw","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"}]');
address = '0xa3296436f6e85a7e8bfc485e64f05e35c9047c92';
X2investContract = web3.eth.contract(abi);
contractInstance = X2investContract.at(address);
var persentRate = contractInstance.persentRate()/1000;
var countOfInvestors = contractInstance.countOfInvestors();
var balanceEth = web3.eth.getBalance(address);
var charity = contractInstance.countOfCharity();

$('#balanceETH').html((balanceEth / 10 ** 18).toFixed(2));
$('#countOfInvestors').html(countOfInvestors.toString());
$('#persentRate').html(persentRate+ '% per hours / ' + (persentRate * 24).toFixed(2) + '% per day');
$('#charity').html((charity / 10 ** 18).toFixed(2) + ' eth');

$.getJSON('https://api.coinmarketcap.com/v2/ticker/1027/').success(function(data) {
    if (data.data.quotes.USD.price) {
        priceUSD = rounded(data.data.quotes.USD.price);
        $('#balanceUSD').html(rounded(priceUSD * (balanceEth / 10 ** 18)));
    }
});

$('#subscribe_wallet').change(function(event) {
    var wallet = $('#subscribe_wallet').val();
    try {
        wallet = web3.toChecksumAddress(wallet);
        let balance = contractInstance.userDeposit(wallet);
        let time = contractInstance.userTime(wallet);
        let persentWithdraw = contractInstance.persentWithdraw(wallet);
        let percentOut = contractInstance.payoutAmount({
            from: wallet
        });
        console.log(persentWithdraw.toString());
        remainDeposit = (balance*2) - persentWithdraw - percentOut;
        //ramainPercent = remainDeposit*persentRate/100;
        remainPercent = balance*persentRate/100;
        timeRemain = remainDeposit/remainPercent;
        $('#time').html(ParseData(time));
        $('#percentOut').html((percentOut / 10 ** 18).toFixed(4) + ' Eth');
        $('#deposit').html((balance / 10 ** 18).toFixed(4) + ' eth');
        $('#timeRemain').html(timeRemain.toFixed(0) + ' hours / ' +  (timeRemain/24).toFixed(2) + ' days');
    } catch (e) {
        console.log(e);
        alert('You have entered an incorrect address. Please enter the address again.');
        $('#loading').hide();
    }

});

function ParseData(timestamp) {

    date = new Date();
    date.setTime(timestamp * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    var seconds = date.getSeconds();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return day + "." + month + "." + year + ", " + hours + ":" + minutes;
}

function getDay(timestamp) {
    date = new Date();
    var currentUnixTime = date.now;
    if (Math.random(currentUnixTime - timestamp) > 1) {
        return Math.round(currentUnixTime - timestamp);
    } else {
        return 0
    }

}

var rounded = function(number) {
    return +number.toFixed(2);
}

var roundedEth = function(number) {
    return +number.toFixed(3);
}

function CopyToClipboard(txt) {
txt = document.createTextNode(txt);
    document.body.appendChild(txt);
    if (document.body.createTextRange) {
        var d = document.body.createTextRange();
        d.moveToElementText(txt);
        d.select();
        document.execCommand('copy');
    } else {
        var d = document.createRange();
        d.selectNodeContents(txt);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(d);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    }
    txt.remove();
    }
    
});
