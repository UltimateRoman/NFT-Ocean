// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NftoBase is ERC721{

    constructor() public ERC721("Nfto", "NFTO") {}
    
    uint tokenID;
    uint offerCount;
    uint eCount;
    uint dCount;
    uint vCount;
    
    mapping(uint => Item) items;
    mapping(uint => Offer) offers;
    mapping(uint => Item) english;
    mapping(uint => Item) dutch;
    mapping(uint => Item) vickery;

    struct Item {
        uint id;
        uint256 latestPrice;
        string name;
        string description;
        string cid;
        bool isListed;
        address payable owner;
    }

    struct Offer {
        uint id;
        uint tId;
        uint256 offerAmount;
        address bidder;
        address auctioneer;
        bool isApproved;
    }

    event ItemMinted(
        uint id,
        string name,
        string description,
        address payable owner
    );

    event ItemListed(
        uint id,
        uint eCount,
        uint dCount,
        bool isListed
    );

    
    function mintItem(uint256 _price, string memory _name, string memory _description, string memory _cid) external {
        require(_price > 0, "Invalid price");
        tokenID++;
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _cid);
        items[tokenID] = Item(tokenID, _price, _name, _description, _cid, false, msg.sender);
        emit ItemMinted(tokenID, _name, _description, msg.sender);
    }


    function listItem(uint _id, string memory _type, uint256 _price) external {
        require(_id > 0 && _id <= tokenID, "Invalid Id");

        if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("english")))) {
            eCount++;
            english[eCount] = items[_id];
            english[eCount].latestPrice = _price;
        }

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("dutch")))) {
            dCount++;
            dutch[dCount] = items[_id];
            dutch[dCount].latestPrice = _price;
        }

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("vickery")))) {
            vCount++;
            vickery[vCount] = items[_id];
            vickery[vCount].latestPrice = _price;
        }

        items[_id].isListed = true;
        emit ItemListed(_id, eCount, dCount, items[_id].isListed);
    }
}

