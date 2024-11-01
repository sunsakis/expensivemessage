// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ExpensiveMessage {
    IERC20 public rgcviiToken;
    uint public msgPrice;
    string public message;
    address public messenger;

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

    event MessageChanged(uint newPrice, address messenger, string message, string imgHash, uint msgCounter);
    event Withdraw(uint amount);
    event MessageOverwritten(uint price, address messenger, string message, string imgHash, uint msgCounter);

    constructor(address _rgcviiTokenAddress) {
        rgcviiToken = IERC20(_rgcviiTokenAddress);
        message = "Hamsters Seek Truth In The Noise Of Discord";
        msgPrice = 1 * 10**18;
        owner = msg.sender;
        messenger = msg.sender;
        msgCounter = 0;
        messages[msgCounter] = Message(message, messenger, msgPrice, block.timestamp, "ipfs://Qma3Kst1nmrWeqrTdSaynkYUZjGDUM7nvHmDnhEpUoRrr3/smallglitchham.gif", "");
        emit MessageChanged(msgPrice, msg.sender, message, "", msgCounter);
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

 function setMessage(string memory _message, string memory _imgHash, string memory _name) external {
        require(rgcviiToken.balanceOf(msg.sender) >= msgPrice * 2, "Your message deserves to be more expensive.");
        require(bytes(_message).length > 0, "Message cannot be empty.");

        uint previousPrice = msgPrice;
        address previousMessenger = messenger;

        uint newPrice = msgPrice * 2;
        
        require(rgcviiToken.transferFrom(msg.sender, address(this), newPrice), "Token transfer failed");

        messages[msgCounter++] = Message(_message, msg.sender, newPrice, block.timestamp, _imgHash, _name);
        message = _message;
        msgPrice = newPrice;
        messenger = msg.sender;

        uint transferAmount = previousPrice + (newPrice - previousPrice) / 2;
        require(rgcviiToken.transfer(previousMessenger, transferAmount), "Failed to send tokens to previous messenger");

        emit MessageChanged(msgPrice, msg.sender, message, _imgHash, msgCounter);
    }

    function withdrawTokens(uint amount) external onlyOwner {
        require(rgcviiToken.transfer(owner, amount), "Token withdrawal failed");
        emit Withdraw(amount);
    }
}