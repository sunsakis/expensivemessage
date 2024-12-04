
export default [
    "event MessageChanged(uint newPrice, address messenger, string message, string imgHash, uint msgCounter)",
    "event Withdraw(uint amount)",
    "event MessageOverwritten(uint price, address messenger, string message, uint msgCounter)",
    "function setMessage(string memory _message, string memory _imgHash, string memory _name) external payable",
    "function readMessage() public view returns (string memory, uint)",
    "function getMessages(uint _msgCounter) public view returns (string memory)",
    "function getPrices(uint256 _msgCounter) public view returns (uint)",
    "function getImgHashes(uint _msgCounter) public view returns (string memory)",
    "function getNames(uint _msgCounter) public view returns (string memory)",
    "function getPrice() public view returns (uint)",
    "function withdraw() external",
    "function overwrite(string memory _message, string memory _imgHash, string memory _name, uint _counter) external payable",
    "function getMessengers(uint _msgCounter) public view returns (address)",
];
      