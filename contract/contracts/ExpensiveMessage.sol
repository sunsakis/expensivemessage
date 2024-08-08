// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpensiveMessage {
    uint public msgPrice;
    string public message;
    address public messenger;
    uint public fee;
    uint public percentage;

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
        require(msg.sender == owner || msg.sender == 0xa89a142D86f2eB69827D74c0EC27317cB1715e78, "Not an owner");
        _;
    }

    event MessageChanged(uint newPrice, address messenger, string message, uint msgCounter);
    event Withdraw(uint amount);
    event MessageOverwritten(uint price, address messenger, string message, uint msgCounter);
    event PercentageChanged(uint newPercentage);

    constructor() {
        message = "The Times 07/Aug/2024 The world seeks truth in the noise of social media";
        msgPrice = 0.01 ether;
        owner = msg.sender;
        messenger = msg.sender;
        msgCounter = 0;
        percentage = 5;
        fee = (msgPrice * percentage) / 100 > 0.02 ether ? (msgPrice * percentage) / 100 : 0.02 ether;
        messages[msgCounter] = Message(message, messenger, msgPrice, block.timestamp, "", "Aria Veritas");
        emit MessageChanged(msgPrice, msg.sender, message, msgCounter);
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

   function readMessage() public view returns (string memory, uint) {
        return (message, msgCounter);
    }

    function getPrice() public view returns (uint) {
        return msgPrice;
    }

    function setMessage(string memory _message, string memory _imgHash, string memory _name) external payable {
        require(msg.value >= msgPrice + fee, "Your message deserves to be more expensive.");
        require(bytes(_message).length > 0, "Message cannot be empty.");

        uint previousPrice = msgPrice;
        address previousMessenger = messenger;

        messages[msgCounter++] = Message(_message, msg.sender, msg.value, block.timestamp, _imgHash, _name);
        message = _message;
        msgPrice = msg.value;
        messenger = msg.sender;

        (bool sent, ) = previousMessenger.call{ value: previousPrice + (msgPrice - previousPrice) / 2 }("");
        require(sent, "Failed to send Ether.");

        emit MessageChanged(msgPrice, msg.sender, message, msgCounter);
    }

    function withdraw() external onlyOwner {
        uint totalBalance = address(this).balance;
        uint amountA = (totalBalance * 40) / 100;
        uint amountB = (totalBalance * 10) / 100;

        address payable recipientA = payable(0xa89a142D86f2eB69827D74c0EC27317cB1715e78);
        address payable recipientB = payable(0x26E1138Ae46438282c4BE895F3E05A2cE6Dc7C80);
        address payable recipientC = payable(0x4052FeaC7728B7E4100DA6D6ceA245892Bf80525);
        address payable recipientD = payable(0x9A4f5BA180302f81327102A17302C776142786Dd);

        (bool sentA, ) = recipientA.call{value: amountA}("");
        require(sentA, "Failed to send Ether to recipient A");

        (bool sentB, ) = recipientB.call{value: amountA}("");
        require(sentB, "Failed to send Ether to recipient B");

        (bool sentC, ) = recipientC.call{value: amountB}("");
        require(sentC, "Failed to send Ether to recipient C");

        (bool sentD, ) = recipientD.call{value: amountB}("");
        require(sentD, "Failed to send Ether to recipient D");

        emit Withdraw((amountA + amountB) * 2);
    }

    function overwrite(string memory _message, string memory _imgHash, string memory _name, uint _counter) external payable {
        require(msg.sender == owner, "You are not the owner.");
        require(_counter == msgCounter, "You can only overwrite the last message.");

        messages[_counter] = Message(_message, messenger, msgPrice, block.timestamp, _imgHash, _name);

        emit MessageOverwritten(msgPrice, messenger, message, msgCounter);

        message = _message;
        messenger = msg.sender;
    }

    function changePercentage(uint newPercentage) external {
        require(msg.sender == owner, "You are not the owner.");
        percentage = newPercentage;
        fee = (msgPrice * percentage) / 100 > 0.02 ether ? (msgPrice * percentage) / 100 : 0.02 ether;

        emit PercentageChanged(newPercentage);
    }

    error OnlyOwner();
}