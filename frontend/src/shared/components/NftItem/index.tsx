import { INFTItemData } from '@/types/NFT'
import { Card, Image, Text } from '@mantine/core'
import React from 'react'

interface INftItem {
    data: INFTItemData;
}
function NftItem({data}:INftItem) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
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