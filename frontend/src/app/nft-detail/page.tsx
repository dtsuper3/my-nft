"use client";
import React, { useEffect, useState } from 'react'
import { useNFTMarketplace } from '@/shared/context/NFTMarketplaceContext'
import MainLayout from '@/shared/layout/MainLayout';
import { Accordion, Box, Button, Card, Fieldset, Grid, Text } from '@mantine/core';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import styles from "@/styles/nft-details.module.css";
import CustomAccordion from '@/shared/components/CustomAccordion';
import { FaWallet } from 'react-icons/fa';

function NftDetail() {
    const searchParams = useSearchParams();
    const { buyNFT, currentAccount } = useNFTMarketplace();
    const data = {
        price: searchParams.get("price"),
        tokenId: searchParams.get("tokenId"),
        seller: searchParams.get("seller"),
        owner: searchParams.get("owner"),
        image: searchParams.get("image"),
        name: searchParams.get("name"),
        description: searchParams.get("description"),
        tokenURI: searchParams.get("tokenURI")
    }
    console.log("data", data)
    return (
        <MainLayout>
            <Grid>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Card
                        shadow='lg'
                        radius={"lg"}
                        className={styles["nft-detail-left"]}>
                        {
                            (data.image && data.name) &&
                            <Image
                                src={data.image}
                                width={600}
                                height={600}
                                alt={data.name}
                            />
                        }
                    </Card>
                    <CustomAccordion
                        label='Description'
                        value={data.description} />
                    <CustomAccordion
                        label='Details'
                        value={<Box>
                            <Text>Content address</Text>
                            <Text>{data.owner}</Text>
                        </Box>} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Box>
                        <Fieldset legend="Current Bid" p={"xs"}>
                            <Text>{data.price} ETH</Text>
                        </Fieldset>
                    </Box>
                    <Box mt={"md"}>
                        {currentAccount === data.seller?.toLowerCase() ? (
                            <Text component='p'>You cannot buy your own NFT</Text>
                        ) : currentAccount === data.owner?.toLowerCase() ? (
                            <Button
                                leftSection={<FaWallet />}>
                                List on Marketplace
                            </Button>
                        ) : (
                            <Button
                                leftSection={<FaWallet />}
                                radius={"lg"}
                                onClick={() => buyNFT(data)}>
                                Buy Now
                            </Button>
                        )}
                    </Box>
                </Grid.Col>
            </Grid>
        </MainLayout >
    )
}

export default NftDetail