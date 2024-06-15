import hre from "hardhat";

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
    const nftMarketPlace = await NFTMarketplace.deploy();    

    const TransferFunds = await hre.ethers.getContractFactory("TransferFunds");
    const transferFunds = await TransferFunds.deploy();

    console.log("Deployed NFTMarketplace contract address:", await nftMarketPlace.getAddress());
    console.log("Deployed TransferFunds contract address:", await transferFunds.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1)
    })