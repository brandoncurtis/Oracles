pragma solidity ^0.4.17;

contract Oracle {

  /*Variables*/

  //Owner of the oracle
  address private owner;

  //Mapping of documents stored in the oracle
  mapping(uint => uint) public oracle_values;

  /*Events*/

  event DocumentStored(uint _key, uint _value);

  /*Functions*/

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  //Constructor - Sets owner
  function Oracle() public {
    owner = msg.sender;
  }

  //Allows the owner of the Oracle to store a document in the oracle_values mapping. Documents
  //represent underlying values at a specified date (key).
  function StoreDocument(uint _key, uint _value) public onlyOwner() {
    oracle_values[_key] = _value;
    DocumentStored(_key, _value);
  }

    function RetrieveData(uint _date) public constant returns (uint data) {
    uint value = oracle_values[_date];
    return value;
  }


}
