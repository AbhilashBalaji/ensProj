pragma solidity ^0.5.0;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
contract Resolver is Ownable {
    mapping (string=>address) typeA;
    function resolve(string memory _name) public returns (address){
        // require(typeA[_name],"resolver does not have given name");
        return typeA[_name];
    }
    function addName(string memory _name,address _addr)  public returns(int) {
        // require(!typeA[_name],"name already used");
        typeA[_name] = _addr;
        return 0;
    }
}