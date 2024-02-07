/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { NonPayableOverrides } from "../../../common";
import type {
  MyToken,
  MyTokenInterface,
} from "../../../contracts/ERC20.sol/MyToken";
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "ERC2612ExpiredSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC2612InvalidSigner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256",
      },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string",
      },
    ],
    name: "StringTooLong",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6101606040523480156200001257600080fd5b506040518060400160405280600781526020017f4d79546f6b656e00000000000000000000000000000000000000000000000000815250806040518060400160405280600181526020017f31000000000000000000000000000000000000000000000000000000000000008152506040518060400160405280600781526020017f4d79546f6b656e000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4d544b00000000000000000000000000000000000000000000000000000000008152508160039081620000fd91906200056f565b5080600490816200010f91906200056f565b50505062000128600583620001c960201b90919060201c565b610120818152505062000146600682620001c960201b90919060201c565b6101408181525050818051906020012060e08181525050808051906020012061010081815250504660a08181525050620001856200022160201b60201c565b608081815250503073ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff168152505050505062000879565b6000602083511015620001ef57620001e7836200027e60201b60201c565b90506200021b565b826200020183620002eb60201b60201c565b60000190816200021291906200056f565b5060ff60001b90505b92915050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60e05161010051463060405160200162000263959493929190620006c7565b60405160208183030381529060405280519060200120905090565b600080829050601f81511115620002ce57826040517f305a27a9000000000000000000000000000000000000000000000000000000008152600401620002c59190620007b3565b60405180910390fd5b805181620002dc9062000809565b60001c1760001b915050919050565b6000819050919050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200037757607f821691505b6020821081036200038d576200038c6200032f565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003f77fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620003b8565b620004038683620003b8565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620004506200044a62000444846200041b565b62000425565b6200041b565b9050919050565b6000819050919050565b6200046c836200042f565b620004846200047b8262000457565b848454620003c5565b825550505050565b600090565b6200049b6200048c565b620004a881848462000461565b505050565b5b81811015620004d057620004c460008262000491565b600181019050620004ae565b5050565b601f8211156200051f57620004e98162000393565b620004f484620003a8565b8101602085101562000504578190505b6200051c6200051385620003a8565b830182620004ad565b50505b505050565b600082821c905092915050565b6000620005446000198460080262000524565b1980831691505092915050565b60006200055f838362000531565b9150826002028217905092915050565b6200057a82620002f5565b67ffffffffffffffff81111562000596576200059562000300565b5b620005a282546200035e565b620005af828285620004d4565b600060209050601f831160018114620005e75760008415620005d2578287015190505b620005de858262000551565b8655506200064e565b601f198416620005f78662000393565b60005b828110156200062157848901518255600182019150602085019450602081019050620005fa565b868310156200064157848901516200063d601f89168262000531565b8355505b6001600288020188555050505b505050505050565b6000819050919050565b6200066b8162000656565b82525050565b6200067c816200041b565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620006af8262000682565b9050919050565b620006c181620006a2565b82525050565b600060a082019050620006de600083018862000660565b620006ed602083018762000660565b620006fc604083018662000660565b6200070b606083018562000671565b6200071a6080830184620006b6565b9695505050505050565b600082825260208201905092915050565b60005b838110156200075557808201518184015260208101905062000738565b60008484015250505050565b6000601f19601f8301169050919050565b60006200077f82620002f5565b6200078b818562000724565b93506200079d81856020860162000735565b620007a88162000761565b840191505092915050565b60006020820190508181036000830152620007cf818462000772565b905092915050565b600081519050919050565b6000819050602082019050919050565b600062000800825162000656565b80915050919050565b60006200081682620007d7565b826200082284620007e2565b90506200082f81620007f2565b9250602082101562000872576200086d7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83602003600802620003b8565b831692505b5050919050565b60805160a05160c05160e051610100516101205161014051611c17620008d46000396000610a3e01526000610a0301526000610f5301526000610f32015260006108fe015260006109540152600061097d0152611c176000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806370a082311161008c57806395d89b411161006657806395d89b4114610230578063a9059cbb1461024e578063d505accf1461027e578063dd62ed3e1461029a576100cf565b806370a08231146101ac5780637ecebe00146101dc57806384b0196e1461020c576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063313ce567146101705780633644e5151461018e575b600080fd5b6100dc6102ca565b6040516100e99190611440565b60405180910390f35b61010c600480360381019061010791906114fb565b61035c565b6040516101199190611556565b60405180910390f35b61012a61037f565b6040516101379190611580565b60405180910390f35b61015a6004803603810190610155919061159b565b610389565b6040516101679190611556565b60405180910390f35b6101786103b8565b604051610185919061160a565b60405180910390f35b6101966103c1565b6040516101a3919061163e565b60405180910390f35b6101c660048036038101906101c19190611659565b6103d0565b6040516101d39190611580565b60405180910390f35b6101f660048036038101906101f19190611659565b610418565b6040516102039190611580565b60405180910390f35b61021461042a565b604051610227979695949392919061178e565b60405180910390f35b6102386104d4565b6040516102459190611440565b60405180910390f35b610268600480360381019061026391906114fb565b610566565b6040516102759190611556565b60405180910390f35b6102986004803603810190610293919061186a565b610589565b005b6102b460048036038101906102af919061190c565b6106d1565b6040516102c19190611580565b60405180910390f35b6060600380546102d99061197b565b80601f01602080910402602001604051908101604052809291908181526020018280546103059061197b565b80156103525780601f1061032757610100808354040283529160200191610352565b820191906000526020600020905b81548152906001019060200180831161033557829003601f168201915b5050505050905090565b600080610367610758565b9050610374818585610760565b600191505092915050565b6000600254905090565b600080610394610758565b90506103a1858285610772565b6103ac858585610806565b60019150509392505050565b60006012905090565b60006103cb6108fa565b905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000610423826109b1565b9050919050565b60006060806000806000606061043e6109fa565b610446610a35565b46306000801b600067ffffffffffffffff811115610467576104666119ac565b5b6040519080825280602002602001820160405280156104955781602001602082028036833780820191505090505b507f0f00000000000000000000000000000000000000000000000000000000000000959493929190965096509650965096509650965090919293949596565b6060600480546104e39061197b565b80601f016020809104026020016040519081016040528092919081815260200182805461050f9061197b565b801561055c5780601f106105315761010080835404028352916020019161055c565b820191906000526020600020905b81548152906001019060200180831161053f57829003601f168201915b5050505050905090565b600080610571610758565b905061057e818585610806565b600191505092915050565b834211156105ce57836040517f627913020000000000000000000000000000000000000000000000000000000081526004016105c59190611580565b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886105fd8c610a70565b89604051602001610613969594939291906119db565b604051602081830303815290604052805190602001209050600061063682610ac7565b9050600061064682878787610ae1565b90508973ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146106ba57808a6040517f4b800e460000000000000000000000000000000000000000000000000000000081526004016106b1929190611a3c565b60405180910390fd5b6106c58a8a8a610760565b50505050505050505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b61076d8383836001610b11565b505050565b600061077e84846106d1565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461080057818110156107f0578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016107e793929190611a65565b60405180910390fd5b6107ff84848484036000610b11565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036108785760006040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260040161086f9190611a9c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108ea5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016108e19190611a9c565b60405180910390fd5b6108f5838383610ce8565b505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614801561097657507f000000000000000000000000000000000000000000000000000000000000000046145b156109a3577f000000000000000000000000000000000000000000000000000000000000000090506109ae565b6109ab610f0d565b90505b90565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6060610a3060057f0000000000000000000000000000000000000000000000000000000000000000610fa390919063ffffffff16565b905090565b6060610a6b60067f0000000000000000000000000000000000000000000000000000000000000000610fa390919063ffffffff16565b905090565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190600101919050559050919050565b6000610ada610ad46108fa565b83611053565b9050919050565b600080600080610af388888888611094565b925092509250610b038282611188565b829350505050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610b835760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610b7a9190611a9c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610bf55760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610bec9190611a9c565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610ce2578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610cd99190611580565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610d3a578060026000828254610d2e9190611ae6565b92505081905550610e0d565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610dc6578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610dbd93929190611a65565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610e565780600260008282540392505081905550610ea3565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610f009190611580565b60405180910390a3505050565b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f7f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000004630604051602001610f88959493929190611b1a565b60405160208183030381529060405280519060200120905090565b606060ff60001b8314610fc057610fb9836112ec565b905061104d565b818054610fcc9061197b565b80601f0160208091040260200160405190810160405280929190818152602001828054610ff89061197b565b80156110455780601f1061101a57610100808354040283529160200191611045565b820191906000526020600020905b81548152906001019060200180831161102857829003601f168201915b505050505090505b92915050565b60006040517f190100000000000000000000000000000000000000000000000000000000000081528360028201528260228201526042812091505092915050565b60008060007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08460001c11156110d457600060038592509250925061117e565b6000600188888888604051600081526020016040526040516110f99493929190611b6d565b6020604051602081039080840390855afa15801561111b573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361116f57600060016000801b9350935093505061117e565b8060008060001b935093509350505b9450945094915050565b6000600381111561119c5761119b611bb2565b5b8260038111156111af576111ae611bb2565b5b03156112e857600160038111156111c9576111c8611bb2565b5b8260038111156111dc576111db611bb2565b5b03611213576040517ff645eedf00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6002600381111561122757611226611bb2565b5b82600381111561123a57611239611bb2565b5b0361127f578060001c6040517ffce698f70000000000000000000000000000000000000000000000000000000081526004016112769190611580565b60405180910390fd5b60038081111561129257611291611bb2565b5b8260038111156112a5576112a4611bb2565b5b036112e757806040517fd78bce0c0000000000000000000000000000000000000000000000000000000081526004016112de919061163e565b60405180910390fd5b5b5050565b606060006112f983611360565b90506000602067ffffffffffffffff811115611318576113176119ac565b5b6040519080825280601f01601f19166020018201604052801561134a5781602001600182028036833780820191505090505b5090508181528360208201528092505050919050565b60008060ff8360001c169050601f8111156113a7576040517fb3512b0c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80915050919050565b600081519050919050565b600082825260208201905092915050565b60005b838110156113ea5780820151818401526020810190506113cf565b60008484015250505050565b6000601f19601f8301169050919050565b6000611412826113b0565b61141c81856113bb565b935061142c8185602086016113cc565b611435816113f6565b840191505092915050565b6000602082019050818103600083015261145a8184611407565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061149282611467565b9050919050565b6114a281611487565b81146114ad57600080fd5b50565b6000813590506114bf81611499565b92915050565b6000819050919050565b6114d8816114c5565b81146114e357600080fd5b50565b6000813590506114f5816114cf565b92915050565b6000806040838503121561151257611511611462565b5b6000611520858286016114b0565b9250506020611531858286016114e6565b9150509250929050565b60008115159050919050565b6115508161153b565b82525050565b600060208201905061156b6000830184611547565b92915050565b61157a816114c5565b82525050565b60006020820190506115956000830184611571565b92915050565b6000806000606084860312156115b4576115b3611462565b5b60006115c2868287016114b0565b93505060206115d3868287016114b0565b92505060406115e4868287016114e6565b9150509250925092565b600060ff82169050919050565b611604816115ee565b82525050565b600060208201905061161f60008301846115fb565b92915050565b6000819050919050565b61163881611625565b82525050565b6000602082019050611653600083018461162f565b92915050565b60006020828403121561166f5761166e611462565b5b600061167d848285016114b0565b91505092915050565b60007fff0000000000000000000000000000000000000000000000000000000000000082169050919050565b6116bb81611686565b82525050565b6116ca81611487565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611705816114c5565b82525050565b600061171783836116fc565b60208301905092915050565b6000602082019050919050565b600061173b826116d0565b61174581856116db565b9350611750836116ec565b8060005b83811015611781578151611768888261170b565b975061177383611723565b925050600181019050611754565b5085935050505092915050565b600060e0820190506117a3600083018a6116b2565b81810360208301526117b58189611407565b905081810360408301526117c98188611407565b90506117d86060830187611571565b6117e560808301866116c1565b6117f260a083018561162f565b81810360c08301526118048184611730565b905098975050505050505050565b61181b816115ee565b811461182657600080fd5b50565b60008135905061183881611812565b92915050565b61184781611625565b811461185257600080fd5b50565b6000813590506118648161183e565b92915050565b600080600080600080600060e0888a03121561188957611888611462565b5b60006118978a828b016114b0565b97505060206118a88a828b016114b0565b96505060406118b98a828b016114e6565b95505060606118ca8a828b016114e6565b94505060806118db8a828b01611829565b93505060a06118ec8a828b01611855565b92505060c06118fd8a828b01611855565b91505092959891949750929550565b6000806040838503121561192357611922611462565b5b6000611931858286016114b0565b9250506020611942858286016114b0565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061199357607f821691505b6020821081036119a6576119a561194c565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060c0820190506119f0600083018961162f565b6119fd60208301886116c1565b611a0a60408301876116c1565b611a176060830186611571565b611a246080830185611571565b611a3160a0830184611571565b979650505050505050565b6000604082019050611a5160008301856116c1565b611a5e60208301846116c1565b9392505050565b6000606082019050611a7a60008301866116c1565b611a876020830185611571565b611a946040830184611571565b949350505050565b6000602082019050611ab160008301846116c1565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611af1826114c5565b9150611afc836114c5565b9250828201905080821115611b1457611b13611ab7565b5b92915050565b600060a082019050611b2f600083018861162f565b611b3c602083018761162f565b611b49604083018661162f565b611b566060830185611571565b611b6360808301846116c1565b9695505050505050565b6000608082019050611b82600083018761162f565b611b8f60208301866115fb565b611b9c604083018561162f565b611ba9606083018461162f565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea2646970667358221220a40a9ac28789c9734938e09433a1ded820c26044df4c9c08125e4789a89cc78b64736f6c63430008140033";

type MyTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MyTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MyToken__factory extends ContractFactory {
  constructor(...args: MyTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MyToken & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MyToken__factory {
    return super.connect(runner) as MyToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyTokenInterface {
    return new Interface(_abi) as MyTokenInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): MyToken {
    return new Contract(address, _abi, runner) as unknown as MyToken;
  }
}
