// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nfto is ERC721 {
    constructor() public ERC721("Nfto", "NFTO") {}
    
    uint public tokenId;
    uint public offerCount;
    uint public eCount;
    uint public dCount;
    uint public vCount;
    
    mapping(uint => Item) public items;
    mapping(uint => Offer) public offers;
    mapping(uint => Item) public english;
    mapping(uint => Item) public dutch;
    mapping(uint => Item) public vickery;

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

    
    function mintItem(uint256 _price, string memory _name, string memory _description, string memory _cid) external {
        require(_price > 0, "Invalid price");
        tokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _cid);
        items[tokenId] = Item(tokenId, _price, _name, _description, _cid, false, msg.sender);
    }


    function listItem(uint _id, string memory _type, uint256 _price) external {

        if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("english")))) {
            eCount++;
            english[eCount] = items[_id];
            english[eCount].owner = msg.sender;
            english[eCount].latestPrice = _price;
        }

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("dutch")))) {
            dCount++;
            dutch[dCount] = items[_id];
            dutch[dCount].owner = msg.sender;
            dutch[dCount].latestPrice = _price;
        }

        else if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("vickery")))) {
            vCount++;
            vickery[vCount] = items[_id];
            vickery[vCount].owner = msg.sender;
            vickery[vCount].latestPrice = _price;
        }

        items[_id].isListed = true;
    }

    function makeOffer(uint _id, uint256 _amount, string memory _type) external {

        uint _tId = 1;
        for(uint j = 1; j <= tokenId; j++) {
            if(keccak256(abi.encodePacked((items[j].name))) == keccak256(abi.encodePacked((vickery[_id].name)))) {
                _tId = j;
            }
        }

        offerCount++;
        offers[offerCount] = Offer(offerCount, _tId, _amount, msg.sender, vickery[_id].owner, false);       

        if(keccak256(abi.encodePacked((_type))) == keccak256(abi.encodePacked(("vickery")))) {
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
        Offer memory offer = offers[_id];
        uint tId = offer.tId;
        address bidder = offer.bidder;
        offer.isApproved = true;
        uint vid = 1;
        for(uint j = 1; j <= vCount; j++) {
            if(keccak256(abi.encodePacked((items[tId].name))) == keccak256(abi.encodePacked((vickery[j].name)))) {
                vid = j;
            }
        }
        offer.offerAmount = vickery[vid].latestPrice;
        offers[_id] = offer;
        approve(bidder, tId);
    }


    function purchaseItem(uint _tId) external payable {
        Item memory item = items[_tId];
        address payable owner = item.owner;
        (bool isSent, ) = owner.call{value: msg.value}("");

        if(isSent) {
            safeTransferFrom(owner, msg.sender, _tId);
            item.isListed = false;
            item.owner = msg.sender;
            items[_tId] = item;
        }
    }
}