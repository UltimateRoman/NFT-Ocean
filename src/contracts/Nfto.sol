// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Ocean is ERC721{
    
    constructor() public ERC721("Ocean", "OCE") {}
    
    uint tokenID;
    
    mapping(uint => Item) items;
    
    struct Item {
        uint id;
        uint256 price;
        string name;
        string description;
        string cid;
        bool sold;
        address payable owner;
    }
    
    function mintItem(uint256 _price, string memory _name, string memory _description, string memory _cid) public {
        require(_price > 0, "Invalid price");
        tokenID++;
        _safeMint(msg.sender, tokenID);
        _setTokenURI(tokenID, _cid);
        items[tokenID] = Item(tokenID, _price, _name, _description, _cid, false, msg.sender);
    }
}

