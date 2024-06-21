"use client";
import { useNFTMarketplace } from '@/shared/context/NFTMarketplaceContext';
import MainLayout from '@/shared/layout/MainLayout';
import { INFTItemData } from '@/types/NFT';
import { Box, Card, Grid, Group, Image, Skeleton, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react'



function Search() {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<INFTItemData[]>([]);
    const { fetchNFTS } = useNFTMarketplace();
    useEffect(() => {
        async function fetData() {
            setIsLoading(true);
            const items = await fetchNFTS();
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
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Card.Section>
                                        <Image
                                            src={i.image}
                                            height={300}
                                            style={{
                                                objectFit:"fill"
                                            }}
                                            alt="Norway"
                                        />
                                    </Card.Section>
                                    <Text size="md">
                                        #{i.tokenId}
                                    </Text>
                                    <Text size="md">
                                        {i.name}
                                    </Text>
                                    <Text size="sm" c="dimmed">
                                        {i.description}
                                    </Text>
                                    <Text size="md">
                                        {i.price} ETH
                                    </Text>
                                </Card>
                            </Grid.Col>
                        ))
                }
            </Grid>
        </MainLayout>
    )
}

export default Search