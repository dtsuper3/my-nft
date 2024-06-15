import React, { useContext, useEffect, useState } from 'react'
import web3Modal from "web3modal";
import { ethers } from "ethers";
import { NFTMarketplaceAddress, NFTMarketplaceABI } from '../../../../config';
import axios from 'axios';


// Fetching smart contract
const fetchContract = (signerOrProvider: any) => {
    return new ethers.Contract(NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider);
}

// Connecting with smart contract
const connectingWithSmartContract = async () => {
    try {
        const _web3Modal = new web3Modal();
        const connection = await _web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong while connecting with contract ", error);
    }
}

interface NFTMarketplaceContextType {
    checkIfWalletIsConnected: () => void;
    connectWallet: () => void;
    uploadToIPFS: (file: any) => void;
    createNFT: (formInput: any, fileUrl: string, router?: any) => void,
    fetchNFTS: () => void;
    fetchMyNFTsOrListedNFTs: (type: string) => void;
    buyNFT: (nft: any) => void;
    currentAccount: string;
}

const NFTMarketplaceContext = React.createContext<NFTMarketplaceContextType>({
    checkIfWalletIsConnected: () => { },
    connectWallet: () => { },
    uploadToIPFS: () => { },
    createNFT: () => { },
    fetchNFTS: () => { },
    fetchMyNFTsOrListedNFTs: () => { },
    buyNFT: () => { },
    currentAccount: ""
});

function NFTMarketplaceContextProvider({ children }: any) {
    const [currentAccount, setCurrentAccount] = useState("");

    // Check if wallet is connected
    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) {
                return console.log("Install Metamask");
            }
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No connected accounts");
            }
            console.log("accounts", accounts)
        } catch (error) {
            console.log("Something went wrong on checkWalletIsConnected ", error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    // Connect wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                return console.log("Install Metamask");
            }
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log("Something went wrong on connectWallet ", error);
        }
    }

    // Upload to IPFS
    const uploadToIPFS = async (file: any) => {
        try {
            const url = ""
            return url;
        } catch (error) {
            console.log("Something went wrong on uploadToIPFS ", error);
        }
    }

    // Create sale
    const createSale = async (url: string, formInputPrice: string, isReselling?: any, id?: any) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice, "ether");
            const contract: any = await connectingWithSmartContract();
            const listingPrice = await contract.getListingPrice().toString();
            const transaction = !isReselling ?
                await contract.createToken(url, price, { value: listingPrice }) :
                await contract.resellToken(id, price, { value: listingPrice });

            await transaction.wait();
        } catch (error) {
            console.log("Something went wrong on createSale ", error);
        }
    }

    // Create NFT
    const createNFT = async (formInput: any, fileUrl: string, router: any) => {
        try {
            const { name, description, price } = formInput;
            if (!name || !description || !price || !fileUrl) {
                console.log("Data is missing");
                return
            }
            const data = JSON.stringify({ name, description, image: fileUrl });
            // Todo create IPFS url
            const url = data;
            await createSale(url, price);
        } catch (error) {
            console.log("Something went wrong on createNFT ", error);
        }
    }

    // Fetch all NFTS
    const fetchNFTS = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItem();

            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const { data } = await axios.get(tokenURI);

                    const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image: data.image,
                        name: data.name,
                        description: data.description,
                        tokenURI
                    }
                })
            )
            return items;
        } catch (error) {

        }
    }

    // Fetching my NFT of listed NFTS
    const fetchMyNFTsOrListedNFTs = async (type: string) => {
        try {
            const contract: any = await connectingWithSmartContract();
            const data = type === "fetchItemsListed" ?
                await contract.fetchItemsLists() :
                await contract.fetchMyNFT();

            const items = await Promise.all(
                data.map(async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const { data } = await axios.get(tokenURI);

                    const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image: data.image,
                        name: data.name,
                        description: data.description,
                        tokenURI
                    }
                })
            )

            return items;
        } catch (error) {
            console.log("Something went wrong on fetchMyNFTs ", error);
        }
    }

    // Buy NFTs
    const buyNFT = async (nft: any) => {
        try {
            const contract: any = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
            const transaction = await contract.createMarketSale(nft.tokenId, { value: price });

            await transaction.wait();
        } catch (error) {
            console.log("Something went wrong on buyNFT ", error);
        }
    }

    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletIsConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTS,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                currentAccount
            }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
}

const useNFTMarketplace = () => useContext(NFTMarketplaceContext);

export {
    NFTMarketplaceContextProvider,
    useNFTMarketplace
}