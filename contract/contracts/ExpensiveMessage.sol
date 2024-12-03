// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
//TO DO
//modify smart contract to handle approve and send tokens in one tx
// integrate all ERC20 tokens

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ExpensiveMessage {
    IERC20 public token;
    uint public msgPrice;
    string public message;
    address public messenger;
    string public name;
    uint public timestamp;
    string public imgHash;
    uint public msgCounter;

    struct Message {
        string message;
        address messenger;
        uint price;
        uint timestamp;
        string imgHash;
        string name;
    }

    mapping(uint => Message) public messages;
    uint public msgCounter;
    
    /// @notice The owner of the contract
    address public immutable owner;

    /// @notice Only owner can execute
    modifier onlyOwner() {
        require(msg.sender == owner, "Not an owner");
        _;
    }

    event MessageChanged(uint newPrice, address messenger, string message, string imgHash, uint msgCounter, string name, uint timestamp);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
        message = "Who Will Become The Ultimate DEGEN?";
        msgPrice = 1 * 10**18;
        owner = msg.sender;
        messenger = msg.sender;
        msgCounter = 0;
        messages[msgCounter] = Message(message, messenger, msgPrice, block.timestamp, "ipfs://Qma3Kst1nmrWeqrTdSaynkYUZjGDUM7nvHmDnhEpUoRrr3/smallglitchham.gif", "");
        emit MessageChanged(msgPrice, msg.sender, message, imgHash, msgCounter, name, timestamp);
    }

    function getMessages(uint _msgCounter) public view returns (string memory) {
        return messages[_msgCounter].message;
    }

    function getMessengers(uint _msgCounter) public view returns (address) {
        return messages[_msgCounter].messenger;
    }

    function getPrices(uint _msgCounter) public view returns (uint) {
        return messages[_msgCounter].price;
    }

    function getTimestamps(uint _msgCounter) public view returns (uint) {
        return messages[_msgCounter].timestamp;
    }

    function getImgHashes(uint _msgCounter) public view returns (string memory) {
        return messages[_msgCounter].imgHash;
    }

    function getNames(uint _msgCounter) public view returns (string memory) {
        return messages[_msgCounter].name;
    }

   function readMessage() public view returns (string memory, address, uint, string memory, uint, string memory, uint) {
        return (message, messenger, msgCounter, imgHash, price, name, timestamp);
    }

    function getPrice() public view returns (uint) {
        return msgPrice;
    }

    function setMessage(string memory _message, string memory _imgHash, string memory _name) external {
        require(token.balanceOf(msg.sender) >= msgPrice + getNextIncrement(), "Your balance is too low for the next message.");
        require(bytes(_message).length > 0, "Message cannot be empty.");

        uint previousPrice = msgPrice;
        address previousMessenger = messenger;

        uint newPrice = msgPrice + getNextIncrement();
        
        require(token.transferFrom(msg.sender, address(this), newPrice), "Token transfer failed");

        messages[msgCounter++] = Message(_message, msg.sender, newPrice, block.timestamp, _imgHash, _name);
        message = _message;
        msgPrice = newPrice;
        messenger = msg.sender;

        uint transferAmount = previousPrice + (newPrice - previousPrice) / 2;
        require(token.transfer(previousMessenger, transferAmount), "Failed to send tokens to previous messenger");

        emit MessageChanged(msgPrice, msg.sender, message, _imgHash, msgCounter);
    }

    function getNextIncrement() public view returns (uint) {
        uint currentPrice = msgPrice;
        uint magnitude = 1;
        
        // Find the current order of magnitude
        while (currentPrice >= magnitude * 10) {
            magnitude *= 10;
        }
        
        return magnitude;
    }

    function withdraw() external onlyOwner returns (bool success) {
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(token.transfer(owner, balance), "Transfer failed");
        return true;
    }
}