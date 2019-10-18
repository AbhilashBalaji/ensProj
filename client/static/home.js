var deployedContract;
var registryAddr = "0xF86947E80c11d889b88FD1eF108A39Ef27946ed2";
var resolverAddr = "0x3EE31Ba5dE2526849d2066aFd6841f621B500483";
var Resolved, Added;
$(document).ready(function(){
	$('#connect').on('click', connect);
	$('#add').on('click', function(){
		var address = $("#addAddr").val();
		var name = $("#addName").val();
		addName(address,name);
	});
	$('#resolve').on('click', function(){
		var name = $("#resolveName").val();
    resolve(name);
	});
});

function addName(addr,name){
  Added.watch(function(e,r){
    console.log(e);
    console.log(r);
  })
	deployedContract.addName.sendTransaction(name,addr,function(e,r){
    console.log(e);
    console.log(r);
  });
  Added.stopWatching();
}

function resolve(name){
  Resolved.watch(function(e,r){
    console.log(e);
    console.log(r);
  });
  deployedContract.resolve.call(name,function(e,r){
    console.log(e);
    console.log(r);
  });
  Resolved.stopWatching();
}

function connect(){
	if (window.ethereum) {
		web3 = new Web3(window.ethereum);
		try { 
			window.ethereum.enable().then(function() {
			// User has allowed account access to DApp...
			console.log(web3.currentProvider);
			$('#addr').html(web3.currentProvider.selectedAddress);
			deployedContract = web3.eth.contract(resolver_abi).at(resolverAddr);
         console.log(deployedContract);
         Resolved = deployedContract.Resolved({},{fromBlock:'latest'});
         Added = deployedContract.Added({},{fromBlock:'latest'});
			// return web3.currentProvider.selectedAddress;
			});
		} catch(e) {
		// User has denied account access to DApp...
		console.log(e);
		}
	}
	// Legacy DApp Browsers
	else if (window.web3) {
		web3 = new Web3(web3.currentProvider);
	}
	// Non-DApp Browsers
	else {
		alert('You have to install MetaMask !');
	}
	// return -1;
}

var resolver_abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "Added",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "Resolved",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "isOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "typeA",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "resolve",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_addr",
          "type": "address"
        }
      ],
      "name": "addName",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

var registry_abi = [
	{
	  "inputs": [],
	  "payable": false,
	  "stateMutability": "nonpayable",
	  "type": "constructor"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "previousOwner",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "newOwner",
		  "type": "address"
		}
	  ],
	  "name": "OwnershipTransferred",
	  "type": "event"
	},
	{
	  "constant": true,
	  "inputs": [],
	  "name": "isOwner",
	  "outputs": [
		{
		  "internalType": "bool",
		  "name": "",
		  "type": "bool"
		}
	  ],
	  "payable": false,
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "constant": true,
	  "inputs": [],
	  "name": "owner",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "payable": false,
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [],
	  "name": "renounceOwnership",
	  "outputs": [],
	  "payable": false,
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "newOwner",
		  "type": "address"
		}
	  ],
	  "name": "transferOwnership",
	  "outputs": [],
	  "payable": false,
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "_resolver",
		  "type": "address"
		}
	  ],
	  "name": "addResolver",
	  "outputs": [],
	  "payable": false,
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "internalType": "string",
		  "name": "_name",
		  "type": "string"
		},
		{
		  "internalType": "address",
		  "name": "_resolver",
		  "type": "address"
		}
	  ],
	  "name": "resolve",
	  "outputs": [],
	  "payable": false,
	  "stateMutability": "nonpayable",
	  "type": "function"
	}
  ];