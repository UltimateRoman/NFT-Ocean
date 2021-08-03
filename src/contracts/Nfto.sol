// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./NftoBase.sol";


contract Nfto is NftoBase {

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
        require(_tId >=1 && _tId <= tokenID, "Invalid id");

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