pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint storedData;
  string test;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function getString() public view returns (string memory) {
    return test;
  }

  function setString(string memory s) public {
    test = s;
  }
}
