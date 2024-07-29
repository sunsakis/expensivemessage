
export default [
    "event MessageChanged(uint newPrice, address messenger, string message, uint msgCounter)",
    "function setMessage(string memory _message, string memory _imgHash, string memory _name) external payable",
    "function readMessage() public view returns (string memory, uint)",
    "function getMessages(uint _msgCounter) public view returns (string memory)",
    "function getPrices(uint256 _msgCounter) public view returns (uint)",
    "function getImgHashes(uint _msgCounter) public view returns (string memory)",
    "function getNames(uint _msgCounter) public view returns (string memory)",
    "function getPrice() public view returns (uint)",
    "function withdraw() external",
];
      