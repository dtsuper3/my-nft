import { Card, Skeleton } from '@mantine/core'
import React from 'react'

function NftItemLoader() {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Skeleton height={300} mb="lg" />
            </Card.Section>
            <Skeleton height={20} width={150} mb="sm" />
            <Skeleton height={20} width={300} mb="sm" />
            <Skeleton height={20} width={100} mb="sm" />
        </Card>
    )
}

export default NftItemLoader