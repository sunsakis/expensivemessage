// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpensiveMessage {
    uint256 public currentPrice;
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
        currentPrice = 0.05 ether;  // Initial price
        message = "Hello World!"; // Initial message
        owner = msg.sender;
    }

    function readMessage() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory newMessage) public payable {

        require(msg.value == currentPrice, "Not enough Ether provided.");
        // Update the message
        message = newMessage;
        // Increase the price for the next transaction
        currentPrice += 0.05 ether;
        messenger = msg.sender;


        emit MessageChanged(currentPrice, messenger);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    error OnlyOwner();
}
