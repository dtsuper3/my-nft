import nftMarketplace from "./artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import transferFunds from "./artifacts/contracts/TransferFunds.sol/TransferFunds.json";


// Local
// const NFTMarketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Sepolia
const NFTMarketplaceAddress = "0xA154712cDba9629AF99b65A1Aa289D2c2ea39162";
const NFTMarketplaceABI = nftMarketplace.abi;

// Local
// const TransferFundsAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Sepolia
const TransferFundsAddress = "0x6654EA497a51A084557B2E9be96DBf2B0680BC38";
const TransferFundsABI = transferFunds.abi;

export {
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    TransferFundsAddress,
    TransferFundsABI
}