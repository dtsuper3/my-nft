import nftMarketplace from "./artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import transferFunds from "./artifacts/contracts/TransferFunds.sol/TransferFunds.json";


// Local
// const NFTMarketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Sepolia
const NFTMarketplaceAddress = "0x196FDe4ed1A4cCe7685cc09B16aDf2BE8D709A36";
const NFTMarketplaceABI = nftMarketplace.abi;

// Local
// const TransferFundsAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Sepolia
const TransferFundsAddress = "0xEfB05f892cbF8677Db91B6f83423BC99B0bCd4E3";
const TransferFundsABI = transferFunds.abi;

export {
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    TransferFundsAddress,
    TransferFundsABI
}