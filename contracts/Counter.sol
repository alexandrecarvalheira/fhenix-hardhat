// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";
 import "@fhenixprotocol/contracts/access/Permissioned.sol";
// import "fhevm/lib/TFHE.sol";


contract Counter is Permissioned{
     euint32 private counter;

    function add(inEuint32 calldata encryptedValue) public {
      euint32 value = FHE.asEuint32(encryptedValue);
      counter = FHE.add(value, counter);
    }

    function getCounter(Permission calldata permission) public onlySender(permission) view
      returns (bytes memory) {
            return FHE.sealoutput(counter, permission.publicKey);
    }

}
