pragma solidity ^0.5.0;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
contract Resolver is Ownable{
    mapping (string=>address) public typeA;
    event Added(string name, address addr);
    event Resolved(string name, address addr);
    function resolve(string memory _name) public returns (address){
        // require(typeA[_name],"resolver does not have given name");
        emit Resolved(_name, typeA[_name]);
        return typeA[_name];
    }
    function addName(string memory _name,address _addr)  public returns(int) {
        // require(!typeA[_name],"name already used");
        typeA[_name] = _addr;
        emit Added(_name,typeA[_name]);
        return 56;
    }
}