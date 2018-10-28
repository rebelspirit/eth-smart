$(document).ready(function () {
    var web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/metamask"));
    var abi = [
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "allPercentWithdraw",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "payoutAmount",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "percentWithdraw",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "time",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "percentRate",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "ownerAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "balance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "countOfInvestors",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "stepTime",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "investor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Invest",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "investor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Withdraw",
            "type": "event"
        }
    ];
    var address = '0xB046b53C932c361906caa3DCD737AFd5480FcC43';
    var TwoHundredPercents = web3.eth.contract(abi);
    var contractInstance = TwoHundredPercents.at(address);
    var percentRate = contractInstance.percentRate()/1000;
    var countOfInvestors = contractInstance.countOfInvestors();
    var balanceEth = web3.eth.getBalance(address);


    $('#u54078-4>p').html((balanceEth / 10 ** 18).toFixed(2));
    $('#u54072-4>p').html(countOfInvestors.toString());
    //$('#u54078-4>p').html(percentRate+ '% per hours / ' + (percentRate * 24).toFixed(2) + '% per day');

    $.getJSON('https://api.coinmarketcap.com/v2/ticker/1027/').success(function(data) {
        if (data.data.quotes.USD.price) {
            var priceUSD = rounded(data.data.quotes.USD.price);
            $('#u54075-4>p').html(rounded(priceUSD * (balanceEth / 10 ** 18)));
        }
    });

    $('#buttonu56712').click(function(event) {
        var wallet = $('#address').val();
        try {
            wallet = web3.toChecksumAddress(wallet);
            var percentRate = contractInstance.percentRate();
            var balance = contractInstance.balance(wallet);
            var time = contractInstance.time(wallet);
            var percentWithdraw = contractInstance.allPercentWithdraw(wallet);
            var percentOut = contractInstance.payoutAmount({
                from: wallet
            });
            var remainDeposit = (((balance*2)/ 10 ** 18)).toFixed(4) - (percentWithdraw / 10 ** 18).toFixed(4) - (percentOut / 10 ** 18).toFixed(4);
            console.log(remainDeposit);
            var timeRemain = remainDeposit / (((balance / 10 ** 18).toFixed(4)) * (percentRate / 24000));
            console.log(timeRemain);
            //var remainPercent = balance*percentRate/100;
            //var timeRemain = remainDeposit/remainPercent;
            $('#u56924-4>p').html(ParseData(time));
            $('#u56918-4>p').html((percentOut / 10 ** 18).toFixed(4) + ' ETH');
            $('#u56912-4>p').html((balance / 10 ** 18).toFixed(4) + ' ETH');
            $('#u56927-4>p').html(timeRemain.toFixed(0) + ' hours / ' +  (timeRemain/24).toFixed(2) + ' days');
        } catch (e) {
            console.log(e);
            alert('You have entered an incorrect address. Please enter the address again.');
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

    function rounded(number) {
        return +number.toFixed(2);
    }
});