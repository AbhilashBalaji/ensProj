pragma solidity ^0.5.0;
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
contract Registrar is Ownable {
     address[]  resolvers;
    constructor() public {
        resolvers.push(address(0x0000000000000000000000000000000000000000));

    }
    function addResolver(address _resolver) public  {
        resolvers.push(_resolver);
    }
    function resolve( string memory _name,address _resolver) public {
        _resolver.call(abi.encodePacked(bytes4(keccak256("resolve(strin g)")),_name));
    }   
}