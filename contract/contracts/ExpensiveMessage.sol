// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpensiveMessage {
    uint256 public msgPrice;
    string public message;
    address public messenger;
    
        /// @notice The owner of the contract
    address public immutable owner;

      /// @notice Only owner can execute
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    event MessageChanged(uint256 newPrice, address messenger);

    constructor() {
        msgPrice = 0.00001 ether;
        message = "Hello World!"; 
        owner = msg.sender;
    }

    function readMessage() public view returns (string memory) {
        return message;
    }

    function getPrice() public view returns (uint256) {
        return msgPrice;
    }

    function setMessage(string memory newMessage) public payable {

        require(msg.value == msgPrice, "Not enough Ether provided.");
        message = newMessage;
        msgPrice += 0.00001 ether;

        emit MessageChanged(msgPrice, msg.sender);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    error OnlyOwner();
}
