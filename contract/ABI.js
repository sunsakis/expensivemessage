export const ABI = [
    "event MessageChanged(uint256 newPrice, address messenger, , uint256 msgCounter)",
    "function setMessage(string memory _message, string memory _imgHash, string memory _name) external payable",
    "function readMessage() public view returns (string memory, uint256)",
    "function getMessages(uint256 _msgCounter) public view returns (string memory)",
    "function getPrice() public view returns (uint256)",
    "function withdraw() external",
];