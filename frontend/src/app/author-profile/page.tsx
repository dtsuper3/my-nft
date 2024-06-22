"use client";
import NftItem from '@/shared/components/NftItem';
import NftItemLoader from '@/shared/components/NftItemLoader';
import { useNFTMarketplace } from '@/shared/context/NFTMarketplaceContext'
import MainLayout from '@/shared/layout/MainLayout';
import { INFTItemData } from '@/types/NFT';
import { Grid } from '@mantine/core';
import React, { useEffect, useState } from 'react'

function Author() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<INFTItemData[]>([]);
  const { fetchMyNFTsOrListedNFTs } = useNFTMarketplace();
  useEffect(() => {
    async function fetData() {
      setIsLoading(true);
      const items = await fetchMyNFTsOrListedNFTs();
      console.log("items", items)
      setItems(items);
      setIsLoading(false)
    }
    fetData();
  }, []);
  return (
    <MainLayout>
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
            items.map(i => (
              <Grid.Col span={{ base: 12, lg: 4 }} key={i.tokenId}>
                <NftItem data={i} />
              </Grid.Col>
            ))
        }
      </Grid>
    </MainLayout>
  )
}

export default Author