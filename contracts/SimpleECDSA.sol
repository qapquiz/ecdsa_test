pragma solidity 0.4.24;

contract SimpleECDSA {
    address publicKey = 0xACdbA4985df6b4A0C8AdD5DBCfe8360910E5E8b5;

    modifier mustSignWithECDSA(bytes32 hash, uint8 v, bytes32 r, bytes32 s) {
        require(ecrecover(hash, v, r, s) == publicKey, "ecrecover not match with publicKey");
        _;
    }

    function callWithECDSA(bytes32 hash, uint8 v, bytes32 r, bytes32 s) 
        public 
        view 
        mustSignWithECDSA(hash, v, r, s) 
        returns (uint8) 
    {
        return 1;
    }
}
