"use client";
import NftItem from '@/shared/components/NftItem';
import { useNFTMarketplace } from '@/shared/context/NFTMarketplaceContext';
import MainLayout from '@/shared/layout/MainLayout';
import { objectToSearchParams } from '@/shared/utils/common';
import { INFTItemData } from '@/types/NFT';
import { Card, Grid, Skeleton } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'



function Search() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [items, setItems] = useState<INFTItemData[]>([]);
    const { fetchNFTS } = useNFTMarketplace();
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const items = await fetchNFTS();
            setItems(items);
            setIsLoading(false)
        }
        fetchData();
    }, []);


    return (
        <MainLayout>
            <Grid
                mt={"lg"}>
                {
                    isLoading ?
                        [1, 2, 3].map(i => (
                            <Grid.Col span={{ base: 12, lg: 4 }} key={i}>
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Card.Section>
                                        <Skeleton height={300} mb="lg" />
                                    </Card.Section>
                                    <Skeleton height={20} width={150} mb="sm" />
                                    <Skeleton height={20} width={300} mb="sm" />
                                    <Skeleton height={20} width={100} mb="sm" />
                                </Card>
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

export default Search