import React from 'react'
import { INFTItemData } from '@/types/NFT'
import { Card, Image, Text } from '@mantine/core'
import styles from './NftItem.module.css';
import { useRouter } from 'next/navigation';
import { objectToSearchParams } from '@/shared/utils/common';

interface INftItem {
    data: INFTItemData;
    onClick?: () => void
}
function NftItem({ data, onClick }: INftItem) {
    const router = useRouter();
    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={styles.nftItemCard}
            onClick={() => onClick ? onClick() : router.push(`/nft-detail?${objectToSearchParams(data)}`)}>
            <Card.Section>
                <Image
                    src={data.image}
                    height={300}
                    style={{
                        objectFit: "fill"
                    }}
                    alt="Norway"
                />
            </Card.Section>
            <Text size="md">
                #{data.tokenId}
            </Text>
            <Text size="md">
                {data.name}
            </Text>
            <Text size="sm" c="dimmed">
                {data.description}
            </Text>
            <Text size="md">
                {data.price} ETH
            </Text>
        </Card>
    )
}

export default NftItem