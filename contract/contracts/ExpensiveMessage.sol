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
        messages[0] = "Hello Word!";
        msgPrice = 0.00001 ether;
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

        reward();

        message = newMessage;
        messages[msgPrice] = newMessage;
        msgPrice = msgPrice * 2;
        messenger = msg.sender;

        emit MessageChanged(msgPrice, msg.sender);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function reward() public {
        payable(messenger).transfer(msgPrice / 4 * 3);
    }

    error OnlyOwner();
}
