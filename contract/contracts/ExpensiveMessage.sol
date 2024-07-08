// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpensiveMessage {
    uint256 public msgPrice;
    uint256 public msgCounter;
    string public message;
    address public messenger;

    mapping(uint256 => string) public messages;
    
        /// @notice The owner of the contract
    address public immutable owner;

      /// @notice Only owner can execute
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }
        _;
    }

    event MessageChanged(uint256 newPrice, address messenger, uint256 msgCounter);

    constructor() {
        messages[0] = "Hello, Word!";
        msgPrice = 0.01 ether;
        owner = msg.sender;
        messenger = msg.sender;
        msgCounter = 0;
    }

    function getMessages(uint256 _msgCounter) public view returns (string memory) {
        return messages[_msgCounter];
    }

   function readMessage() public view returns (string memory) {
        return message;
    }

    function getPrice() public view returns (uint256) {
        return msgPrice;
    }

    /// @notice Set a new message with a custom price increase
    /// @param newMessage The message to set
    /// @param priceIncrease The amount to increase the message price by, with a minimum of 0.01 ETH
    function setMessage(string memory newMessage, uint256 priceIncrease) external payable {
        require(msg.value == msgPrice + 0.01 ether, "Your message is not expensive enough.");
        require(priceIncrease >= 0.01 ether, "Minimum price increase is 0.01 ETH.");

        uint256 rewardToPay = msgPrice;
        address rewardReceiver = messenger;

        message = newMessage;
        messages[msgCounter] = newMessage;
        msgPrice += priceIncrease;
        msgCounter += 1;
        messenger = msg.sender;

        (bool sent, ) = rewardReceiver.call{ value: rewardToPay - priceIncrease / 2 }("");
        require(sent, "Failed to send Ether");

        emit MessageChanged(msgPrice, msg.sender, msgCounter);
    }

    function withdraw() external onlyOwner {
        uint256 totalBalance = address(this).balance;
        uint256 amountA = (totalBalance * 40) / 100; // 40%
        uint256 amountB = (totalBalance * 10) / 100; // 10%

        address payable recipientA = payable(0xa89a142D86f2eB69827D74c0EC27317cB1715e78); // Person 1
        address payable recipientB = payable(0x26E1138Ae46438282c4BE895F3E05A2cE6Dc7C80); // Person 2
        address payable recipientC = payable(0xa89a142D86f2eB69827D74c0EC27317cB1715e78); // Person 3 
        address payable recipientD = payable(0xa89a142D86f2eB69827D74c0EC27317cB1715e78); // Person 4

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