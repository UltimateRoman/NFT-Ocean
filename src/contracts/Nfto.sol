// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nfto is ERC721{
    
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

    
    function mintItem(uint256 _price, string memory _name, string memory _description, string memory _cid) public {
        require(_price > 0, "Invalid price");
        tokenID++;
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _cid);
        items[tokenID] = Item(tokenID, _price, _name, _description, _cid, false, msg.sender);
        emit ItemMinted(tokenID, _name, _description, msg.sender);
    }


    function listItem(uint _id, string memory _type, uint256 _price) public {
        require(_id > 0 && _id <= tokenID, "Invalid Id");

        if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("english")))) {
            eCount++;
            english[eCount] = items[_id];
            Item memory item = english[eCount];
            item.latestPrice = _price;
            english[eCount] = item;
        }

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("dutch")))) {
            dCount++;
            dutch[dCount] = items[_id];
            Item memory item = dutch[dCount];
            item.latestPrice = _price;
            dutch[dCount] = item;
        }

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("vickery")))) {
            vCount++;
            vickery[vCount] = items[_id];
            Item memory item = vickery[vCount];
            item.latestPrice = _price;
            vickery[vCount] = item;
        }

        Item memory item = items[_id];
        item.isListed = true;
        items[_id] = item;
        emit ItemListed(_id, eCount, dCount, item.isListed);
    }


    function makeOffer(uint _id, uint _tId, uint256 _amount, string memory _type) public {
        require(_tId > 0 && _tId <= tokenID, "Invalid Id");
        Item memory _item = items[_tId];
        require(_item.isListed == true, "Item not listed");

        offerCount++;
        offers[offerCount] = Offer(offerCount, _tId, _amount, msg.sender, _item.owner, false);

        if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("english")))) {
            require(_amount < _item.latestPrice, "Invalid price");
            Item memory item = english[_id];
            item.latestPrice = _amount;
            english[_id] = item;
        }

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("dutch")))) {
            require(_amount > _item.latestPrice, "Invalid price");
            Item memory item = dutch[_id];
            item.latestPrice = _amount;
            dutch[_id] = item;
        }

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("vickery")))) {
            require(_amount < _item.latestPrice, "Invalid price");
            Item memory item = vickery[_id];
            uint i;
            uint j;
            Offer[5] memory itemOffers;
            for(i = 1; i <= offerCount; ++i) {
                if(offers[i].tId == vickery[_id].id) {
                    j++;
                    itemOffers[j] = offers[i];
                }
            }
            if(j == 1) {
                item.latestPrice = itemOffers[1].offerAmount;
            }
            else if(j > 1) {
                uint largestAmount;
                uint seclargestAmount;
                largestAmount = itemOffers[1].offerAmount;
                for(i = 1; i <= j; ++i) {
                    if(itemOffers[i].offerAmount > largestAmount) {
                        largestAmount = itemOffers[i].offerAmount;
                    }
                }
                for(i = 1; i <= j; ++i) {
                    if(itemOffers[i].offerAmount != largestAmount) {
                        if(itemOffers[i].offerAmount > seclargestAmount) {
                            seclargestAmount = itemOffers[i].offerAmount;
                        }
                    }
                }
                item.latestPrice = seclargestAmount;
            }
            else {
                item.latestPrice = _amount;
            }
            vickery[_id] = item;
        }
    }


    function approveOffer(uint _id) public {
        require(_id > 0 && _id <= offerCount, "Invalid Id");

        Offer memory offer = offers[_id];
        uint tId = offer.tId;
        address bidder = offer.bidder;
        offer.isApproved = true;
        offers[_id] = offer;
        approve(bidder, tId);
    }


    function purchaseItem(uint _tId) public payable {
        require(_tId > 0 && _tId <= tokenID, "Invalid Id");

        Item memory item = items[_tId];
        address payable owner = item.owner;
        (bool isSent, bytes memory data) = owner.call{value: msg.value}("");

        if(isSent) {
            safeTransferFrom(owner, msg.sender, _tId);
            item.isListed = false;
            item.owner = msg.sender;
            items[_tId] = item;
        }

        require(isSent, "ETH not transferred");
    }
}

