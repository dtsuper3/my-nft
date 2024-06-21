"use client"
import UploadNFT from '@/features/create-nft/UploadNFT/UploadNFT';
import MainLayout from '@/shared/layout/MainLayout'
import { Box, Divider, Text, Title } from '@mantine/core'
import React from 'react'

function CreateNFT() {
    return (
        <MainLayout size={"lg"}>
            <Box>
                <Title order={1}>Create New NFT</Title>
                <Text component='p'>
                    You can set preferred display name, create you profile URL and manage other personal settings.
                </Text>
                <Divider mt={"lg"} />
            </Box>
            <Box mt={"lg"}>
                <Title order={2}>Image, Video, Audio, or 3D Model</Title>
                <Text component='p'>
                    File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLTF, GLB. Max size: 100 MB
                </Text>
                <Divider mt={"lg"} />
            </Box>
            <Box mt={"lg"}>
                <UploadNFT />
            </Box>

        </MainLayout>
    )
}

export default CreateNFT