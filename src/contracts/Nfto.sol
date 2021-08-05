// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nfto is ERC721 {
    constructor() public ERC721("Nfto", "NFTO") {}
    
    uint tokenId;
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
    function retValues() external view returns(uint,uint,uint,uint,uint) {
        return (tokenId,eCount,dCount,vCount,offerCount);
    }
    
    function mintItem(uint256 _price, string memory _name, string memory _description, string memory _cid) external {
        require(_price > 0, "Invalid price");
        tokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _cid);
        items[tokenId] = Item(tokenId, _price, _name, _description, _cid, false, msg.sender);
        emit ItemMinted(tokenId, _name, _description, msg.sender);
    }


    function listItem(uint _id, string memory _type, uint256 _price) external {
        require(_id > 0 && _id <= tokenId, "Invalid Id");

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

    function makeOffer(uint _id, uint _tId, uint256 _amount, string memory _type) external {
        Item memory _item = items[_tId];

        offerCount++;
        offers[offerCount] = Offer(offerCount, _tId, _amount, msg.sender, _item.owner, false);

        if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("english")))) {
            Item memory item = english[_id];
            item.latestPrice = _amount;
            english[_id] = item;
        }

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("dutch")))) {
            Item memory item = dutch[_id];
            item.latestPrice = _amount;
            dutch[_id] = item;
        }        

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("vickery")))) {
            Item memory item = vickery[_id];
            uint i;
            uint largestAmount = 0;
            uint seclargestAmount = largestAmount;

            for(i = 1; i <= offerCount; ++i) {
                if(offers[i].tId == vickery[_id].id) {                    
                    if(offers[i].offerAmount > largestAmount) {
                        seclargestAmount = largestAmount;
                        largestAmount = offers[i].offerAmount;
                    }
                    else if(offers[i].offerAmount > seclargestAmount) {
                        seclargestAmount = offers[i].offerAmount;
                    }
                }
            }

            item.latestPrice = seclargestAmount;
            vickery[_id] = item;
        }
    }

    function approveOffer(uint _id) external {
        require(_id >=1 && _id <= offerCount, "Invalid offer");

        Offer memory offer = offers[_id];
        uint tId = offer.tId;
        address bidder = offer.bidder;
        offer.isApproved = true;
        offers[_id] = offer;
        approve(bidder, tId);
    }


    function purchaseItem(uint _tId) public payable {
        require(_tId >=1 && _tId <= tokenId, "Invalid id");

        Item memory item = items[_tId];
        address payable owner = item.owner;
        (bool isSent, bytes memory data) = owner.call{value: msg.value}("");

        if(isSent) {
            safeTransferFrom(owner, msg.sender, _tId);
            item.isListed = false;
            item.owner = msg.sender;
            items[_tId] = item;
        }
    }
}