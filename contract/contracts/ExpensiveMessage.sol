// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpensiveMessage {
    uint256 public currentPrice;
    string public message;
    address public messenger;
    uint256 public messageID;
    
        /// @notice The owner of the contract
    address public immutable owner;

      /// @notice Only owner can execute
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    event MessageChanged(uint256 newPrice, address messenger, uint256 messageID);

    constructor() {
        currentPrice = 0.05 ether;
        message = "Hello World!"; 
        owner = msg.sender;
    }

    function readMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public payable {

        require(msg.value == currentPrice, "Not enough Ether provided.");
        message = newMessage;
        currentPrice += 0.05 ether;
        messenger = msg.sender;
        messageID++;


        emit MessageChanged(currentPrice, messenger, messageID);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    error OnlyOwner();
}
