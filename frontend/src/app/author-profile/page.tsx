"use client";
import NftItem from '@/shared/components/NftItem';
import NftItemLoader from '@/shared/components/NftItemLoader';
import { useNFTMarketplace } from '@/shared/context/NFTMarketplaceContext'
import MainLayout from '@/shared/layout/MainLayout';
import { INFTItemData } from '@/types/NFT';
import { Button, Flex, Grid } from '@mantine/core';
import React, { useEffect, useState } from 'react'

const tabArray = [
  {
    label: "Collectables",
    value: "collectables"
  },
  {
    label: "Created",
    value: "created"
  }
]
function Author() {
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState<INFTItemData[]>([]);
  const [myNfts, setMyNfts] = useState<INFTItemData[]>([]);
  const [selectedTab, setSelectedTab] = useState<"collectables" | "created">("collectables");
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useNFTMarketplace();
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const items = await fetchMyNFTsOrListedNFTs("fetchMyNfts");
      console.log("fetchMyNfts", items)
      setMyNfts(items);
      setIsLoading(false)
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const items = await fetchMyNFTsOrListedNFTs("fetchItemsListed");
      console.log("fetchItemsListed", items)
      setNfts(items);
      setIsLoading(false)
    }
    fetchData();
  }, []);
  return (
    <MainLayout>
      <Flex gap={"md"}>
        {
          tabArray.map(i => (
            <Button
              variant={selectedTab === i.value ? "filled" : "outline"}
              key={i.value}
              radius={"lg"}
              onClick={() => setSelectedTab(i.value as any)}>{i.label}</Button>
          ))
        }
      </Flex>
      {
        selectedTab === "collectables" &&
        <Grid
          mt={"lg"}>
          {
            isLoading ?
              [1, 2, 3].map(i => (
                <Grid.Col span={{ base: 12, lg: 4 }} key={i}>
                  <NftItemLoader />
                </Grid.Col>
              ))
              :
              nfts.map(i => (
                <Grid.Col span={{ base: 12, lg: 4 }} key={i.tokenId}>
                  <NftItem data={i} />
                </Grid.Col>
              ))
          }
        </Grid>
      }
      {
        selectedTab === "created" &&
        <Grid
          mt={"lg"}>
          {
            isLoading ?
              [1, 2, 3].map(i => (
                <Grid.Col span={{ base: 12, lg: 4 }} key={i}>
                  <NftItemLoader />
                </Grid.Col>
              ))
              :
              myNfts.map(i => (
                <Grid.Col span={{ base: 12, lg: 4 }} key={i.tokenId}>
                  <NftItem data={i} />
                </Grid.Col>
              ))
          }
        </Grid>
      }
    </MainLayout>
  )
}

export default Author