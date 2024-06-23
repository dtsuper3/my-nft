import nftMarketplace from "./artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import transferFunds from "./artifacts/contracts/TransferFunds.sol/TransferFunds.json";


// Local
// const NFTMarketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Sepolia
const NFTMarketplaceAddress = "0xCfA6039e6CAb416754BF9Cbf2e4B34feeC196f6b";
const NFTMarketplaceABI = nftMarketplace.abi;

// Local
// const TransferFundsAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// Sepolia
const TransferFundsAddress = "0xc4B2664933D99b689d0a7Fb993AD56DEAF4a772b";
const TransferFundsABI = transferFunds.abi;

export {
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    TransferFundsAddress,
    TransferFundsABI
}