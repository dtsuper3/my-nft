import { ethers } from "hardhat";

async function main() {
  const NFTMarket = await ethers.getContractFactory("NFTMarket");
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();
  console.log("nftMarket deployed to address:", nftMarket.address);

  const NFT = await ethers.getContractFactory("NFT");  
  const nft = await NFT.deploy(nftMarket.address);
  await nft.deployed();
  console.log("nft deployed to address:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// 0x3D7d69BacabACe043656CAe1b2D9EddC588894e0

0x3FAA024CB13Dc975F76e0cB77844921037Efaf13