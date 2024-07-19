// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpensiveMessage {
    uint256 public msgPrice;
    uint256 public msgCounter;
    string public message;
    address public messenger;
    uint256 public fee;

    mapping(uint256 => string) public messages;
    
        /// @notice The owner of the contract
    address public immutable owner;

      /// @notice Only owner can execute
    modifier onlyOwner() {
        if (msg.sender != owner || msg.sender != 0xa89a142D86f2eB69827D74c0EC27317cB1715e78) {
            revert OnlyOwner();
        }
        _;
    }

    event MessageChanged(uint256 newPrice, address messenger, uint256 msgCounter);

    constructor() {
        message = "Hello, Word!";
        msgPrice = 0.0001 ether;
        owner = msg.sender;
        messenger = msg.sender;
        msgCounter = 0;
        fee = 0.0001 ether;
    }

    function getMessages(uint256 _msgCounter) public view returns (string memory) {
        return messages[_msgCounter];
    }

   function readMessage() public view returns (string memory, uint256) {
        return (message, msgCounter);
    }

    function getPrice() public view returns (uint256) {
        return msgPrice;
    }

    function setMessage(string memory _message) external payable {
        require(msg.value >= msgPrice + fee + 0.0001 ether, "Your message must be at least 0.01 ETH more expensive than the previous one.");

        uint256 previousPrice = msgPrice;
        address previousMessenger = messenger;

        message = _message;
        messages[msgCounter] = _message;
        msgPrice = msg.value - fee;
        msgCounter += 1;
        messenger = msg.sender;

        (bool sent, ) = previousMessenger.call{ value: previousPrice + (msgPrice - previousPrice) / 2 }("");
        require(sent, "Failed to send Ether");

        emit MessageChanged(msgPrice, msg.sender, msgCounter);
    }

    function setFee(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function withdraw() external onlyOwner {
        uint256 totalBalance = address(this).balance;
        uint256 amountA = (totalBalance * 40) / 100;
        uint256 amountB = (totalBalance * 10) / 100;

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
    }

    error OnlyOwner();
}