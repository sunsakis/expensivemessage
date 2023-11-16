// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExpensiveMessage {
    uint256 public msgPrice;
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

    event MessageChanged(uint256 newPrice, address messenger);

    constructor() {
        messages[0] = "Hello, Word!";
        msgPrice = 0.01 ether;
        owner = msg.sender;
        messenger = msg.sender;
    }

    function getMessages(uint256 _msgPrice) public view returns (string memory) {
        return messages[_msgPrice];
    }

   function readMessage() public view returns (string memory) {
        return message;
    }

    function getPrice() public view returns (uint256) {
        return msgPrice;
    }

    function setMessage(string memory newMessage) external payable {

        require(msg.value == msgPrice, "Your message is not expensive enough.");

        uint256 rewardToPay = msgPrice;
        address rewardReceiver = messenger;

        message = newMessage;
        messages[msgPrice] = newMessage;
        msgPrice = msgPrice * 2;
        messenger = msg.sender;

        (bool sent, ) = rewardReceiver.call{ value: rewardToPay * 3 / 4 }("");
        require(sent, "Failed to send Ether");

        emit MessageChanged(msgPrice, msg.sender);
    }

    function withdraw() external onlyOwner payable {
        (bool sent, ) = owner.call{ value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }

    error OnlyOwner();
}