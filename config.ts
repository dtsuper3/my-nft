import nftMarketplace from "./artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import transferFunds from "./artifacts/contracts/TransferFunds.sol/TransferFunds.json";


const NFTMarketplaceAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const NFTMarketplaceABI = nftMarketplace.abi;

const TransferFundsAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const TransferFundsABI = transferFunds.abi;

export {
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    TransferFundsAddress,
    TransferFundsABI
}