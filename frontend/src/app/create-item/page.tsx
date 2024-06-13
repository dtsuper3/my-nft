"use client";
import { ChangeEvent, useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/navigation'

import Web3Modal from 'web3modal'

import {
  nftaddress, nftmarketaddress
} from '../../config'

import NFT from '../../../../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../../../../artifacts/contracts/Market.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const uploadFile = async (fileToUpload: File) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", fileToUpload);
      const res = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();
      const url = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${resData.IpfsHash}`
      setFileUrl(url);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  };

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files) {
        const file = e.target.files[0]
        uploadFile(file);
      }

    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const formData = new FormData();
      formData.set("json", data);
      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const resData = await res.json();
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      const url = `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${resData.IpfsHash}`
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createSale(url: string) {
    try {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()      
      /* next, create the item */
      let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
      let transaction = await contract.createToken(url)
      console.log("transaction", transaction)
      let tx = await transaction.wait()
      let event = tx.events[0]
      let value = event.args[2]
      let tokenId = value.toNumber()
      console.log("formInput", formInput, tokenId)
      const price = ethers.utils.parseUnits(formInput.price, 'ether')

      /* then list the item for sale on the marketplace */
      contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
      let listingPrice = await contract.getListingPrice()
      listingPrice = listingPrice.toString()

      transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
      await transaction.wait()
      router.push('/')
    } catch (error) {
      console.error("Error", error)
    }

  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="NFT Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="NFT Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="NFT Price in Matic"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          uploading ? "file uploading..." :
            fileUrl && (
              <img className="rounded mt-4" width="350" src={fileUrl} alt='file' />
            )
        }
        <button
          onClick={createMarket}
          className="font-bold mt-4 bg-blue-500 text-white rounded p-4 shadow-lg"
          disabled={uploading}>
          List NFT For Sale
        </button>
      </div>
    </div>
  )
}
