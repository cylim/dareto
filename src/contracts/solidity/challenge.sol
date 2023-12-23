// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.20;

// import "@openzeppelin/contracts@5.0.1/access/Ownable.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// enum StatusType {
//     PENDING, 
//     COMPLETED, 
//     FAILED
// }

// struct Challenge {
//     uint256 deadline;
//     address owner;
//     address donationAddress;
//     StatusType status;
//     uint256 amount;
// }

// contract ChallengeContract is Ownable {
//     mapping(string => Challenge) public challenges;

//     address MEME_ADDRESS = address(0x765D0C57b993D3eD180001b817a6bCc13Ce7044e);
//     uint256 SUCCESS_TOKEN_AMOUNT = 69 * 10^18;
//     uint256 FAILURE_TOKEN_AMOUNT = 69 * 10^18;

//     event NewChallenge(
//         string indexed id,
//         address indexed userAddress,
//         uint256 deadline,
//         address donationAddress,
//         uint256 amount
//     );
    
    
//     constructor()
//         Ownable(msg.sender)
//     {
//     } 

//     function getChallenge(string calldata id) public view returns (Challenge memory c) {
//         return challenges[id];
//     }

//     function create(string calldata id, address to, uint256 amount, uint256 deadline) public payable returns(bool success) {
//         require(challenges[id].owner != address(0), "Challenges existed");

//         Challenge memory challenge = Challenge(deadline, msg.sender, to, StatusType.PENDING, amount);

//         challenges[id] = challenge;

//         emit NewChallenge(id, msg.sender, deadline, to, amount);

//         return true;
//     }

//     function complete(string calldata id) public payable returns(bool done) {
//         Challenge memory challenge = challenges[id];
//         require(msg.sender == challenge.owner, "Not challenge owner");
//         if (block.timestamp < challenge.deadline) {
//             forfeit(id);
//         } else {

//             (bool success, ) = msg.sender.call{value: challenge.amount}("");
//             require(success, "failed to withdraw stake");

//             challenge.status = StatusType.COMPLETED;
//             return true;
//         }
//     }

//     function forfeit(string calldata id) public payable returns(bool done){
//         Challenge memory challenge = challenges[id];
//         require(msg.sender == challenge.owner, "Not challenge owner");
//         require(challenge.donationAddress != address(0), "donation address not existed");

//         challenge.status = StatusType.FAILED;

//         (bool success, ) = challenge.donationAddress.call{value: challenge.amount}("");
//         require(success, "failed to donate");

//         IERC20(MEME_ADDRESS).transferFrom(address(this), msg.sender, FAILURE_TOKEN_AMOUNT);

//         return true;
//     }
// }