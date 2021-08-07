# NFT-Ocean

An NFT Marketplace deployed on Polygon Mumbai Testnet, with Custom Auction and Sales mechanisms based on user preference.

 ![logo](/src/logo.png?raw=true)
 
 
 <br/>
 
   NFT Marketplaces are now commonplace, but for auctions, most of them only offer the traditional mechanism where the auctioneer chooses a base price for the NFT and potential buyers place higher bids until finally the highest bid is approved. This is called an English Auction. NFT-Ocean stands out by enabling its users to choose the custom mechanism they prefer for the auction. NFT-Ocean currently supports the following auction schemes.
 
### English Auction
- An English Auction, also referred to as an open cry ascending auction, starts by an auctioneer announcing the suggested opening bid or reserve price for the item on sale. The buyers with interest in the item start placing bids on the item on sale, with the auctioneer accepting higher bids as they come. The buyer with the highest bid at any time is considered the one with a standing bid, which can only be displaced by a higher bid from the floor.     

### Dutch Auction 
 - A Dutch auction is a price discovery process in which the auctioneer starts with the highest asking price and lowers it until it reaches a price level where the bids received will cover the entire offer quantity. The goal of a Dutch auction is to find the optimal price at which to sell the item. 
    
### Vickery Auction
- A Vickery auction is a sealed-bid auction where bidders submit bids without knowing the bids of other people. The individual is bidding their true value and are not trying to assess what everyone else is going to bid. However, the price paid is the second-highest bid price and not the winning bid price. Therefore, the individual is bidding the maximum amount they are willing to pay and are not disadvantaged by it.

NFT Ocean offers three virtual auction houses, one corresponding to each auction mechanism.  The use of custom auction methods enables both creators and collectors to competently trade their NFTs. So in case a particular creator is not receiving satisfactory offers for their NFT, they can choose to switch to another auction scheme to try and get better price deals. Similarly, collectors can also check out the different auction houses to discover the best deals for purchase.

#### [Contract Deployment on Matic Mumbai Testnet](https://mumbai.polygonscan.com/address/0x6Fe442454c345dbd661a13f08a87c1CF1e3C376A).

## Built Using

- Polgyon Mumbai Testnet - provides instant transactions with low gas fees
- Chainlink Price Feeds - secure and reliable price conversions for MATIC/USD
- NFT.storage - Filecoin and IPFS - to store and retrieve off-chain NFT data
- Metamask web wallet
