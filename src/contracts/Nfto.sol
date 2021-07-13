// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nfto is ERC721{
    
    constructor() public ERC721("Nfto", "NFTO") {}
    
    uint tokenID;
    uint eCount;
    uint dCount;
    
    mapping(uint => Item) items;
    mapping(uint => Item) english;
    mapping(uint => Item) dutch;

    struct Item {
        uint id;
        uint256 price;
        string name;
        string description;
        string cid;
        bool isListed;
        address payable owner;
    }

    event ItemMinted(
        uint id,
        string name,
        string description,
        address payable owner
    );
    
    function mintItem(uint256 _price, string memory _name, string memory _description, string memory _cid) public {
        require(_price > 0, "Invalid price");
        tokenID++;
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _cid);
        items[tokenID] = Item(tokenID, _price, _name, _description, _cid, false, msg.sender);
        emit ItemMinted(tokenID, _name, _description, msg.sender);
    }

    function listItem(uint _id, string memory _type) public {
        require(_id > 0 && _id <= tokenID , "Invalid Id");
        if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("english")))) {
            eCount++;
            english[eCount] = items[_id];

        }
        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("dutch")))) {
            dCount++;
            dutch[dCount] = items[_id];
        }
        Item memory item = items[_id];
        item.isListed = true;
        items[_id] = item;
        approve(address(this),_id);
    }
}

