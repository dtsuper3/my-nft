import DropZone from '@/shared/components/DropZone';
import { Avatar, Box, Button, Card, Divider, Flex, Grid, Loader, ScrollArea, Text, TextInput, Textarea } from '@mantine/core';
import Image from 'next/image';
import React, { useCallback, useState } from 'react'
import { MdOutlineHttps, MdPercent } from 'react-icons/md';
import styles from "@/features/create-nft/UploadNFT/upload-nft.module.css";
import { TiTick } from 'react-icons/ti';
import { AiFillPropertySafety } from 'react-icons/ai';
import axios from 'axios';

function UploadNFT() {
    const [imageId, setImageId] = useState();
    const [itemName, setItemName] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [royalties, setRoyalties] = useState("");
    const [category, setCategory] = useState("");
    const [properties, setProperties] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const categoryArray = [
        {
            image: "/images/nft-image-1.png",
            category: "Sports"
        },
        {
            image: "/images/nft-image-2.png",
            category: "Arts"
        },
        {
            image: "/images/nft-image-3.png",
            category: "Music"
        },
        {
            image: "/images/nft-image-1.png",
            category: "Digital"
        },
        {
            image: "/images/nft-image-2.png",
            category: "Time"
        },
    ]

    const handleClick = useCallback(() => {

    }, []);

    const uploadFile = useCallback(async (file: any) => {
        try {
            console.log("file", file)
            const data = new FormData();
            data.set("file", file);
            const res = await axios.post("/api/upload-file", 
                data
            )
            if (res.data?.ipfsHash) {
                setImageId(res.data?.ipfsHash);
            }
        } catch (error) {

        }
    }, []);

    return (
        <Box>
            <DropZone
                title='JPG, PNG, WEBM, MAX 100MB'
                heading='Drag & Drop a file'
                subHeading='or Browse media on your device'
                itemName={itemName}
                category={category}
                description={description}
                royalties={royalties}
                website={website}
                uploadFile={uploadFile}
            />
            <Box my="lg">
                <Flex
                    direction={"column"}
                    gap={"md"}
                    mt={"md"}>
                    <TextInput
                        withAsterisk
                        label="Item Name"
                        placeholder='Enter name'
                        value={itemName}
                        onChange={e => setItemName(e.target.value)} />
                    <TextInput
                        withAsterisk
                        label="Website"
                        leftSection={
                            <MdOutlineHttps />
                        }
                        placeholder='Website'
                        value={website}
                        onChange={e => setWebsite(e.target.value)} />
                    <Text component='p'>
                        Company name will include a link to this URL on this item{"'"}s detail page,
                        so that users can click to learn more about it. Your are welcome to
                        link to your own webpage with more details.
                    </Text>

                    <Textarea
                        label="Description"
                        cols={30}
                        rows={6}
                        placeholder='Something about yourself in few words'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Divider />
                    <Box>
                        <Text component='h3' mb={"sm"}>Choose collection</Text>
                        <Text component='p'>Choose an exciting collection or create a new one</Text>
                    </Box>
                    <Box mt={"lg"}>

                        <Flex
                            gap={"md"}
                            className={styles.upload_box_slider_box_cont}>
                            {
                                categoryArray.map(i => {
                                    return (
                                        <Card
                                            shadow="lg"
                                            padding="lg"
                                            radius="lg"
                                            withBorder
                                            key={i.category}
                                            className={`${styles.upload_box_slider_box} ${category === i.category ? styles.upload_box_slider_box_active : ""}`}
                                            onClick={() => setCategory(i.category)}>

                                            <Box className={styles.upload_box_slider_box_img_cont}>
                                                <Avatar src={i.image} size={"xl"} />
                                            </Box>
                                            <Box
                                                className={`${styles.upload_box_slider_box_tick} ${category === i.category ? styles.upload_box_slider_box_tick_active : ""}`}>
                                                <TiTick size={18} />
                                            </Box>
                                            <Text
                                                component='p'
                                                mt="md">Crypto legend - {i.category}</Text>
                                        </Card>
                                    )
                                })
                            }
                        </Flex>
                        <Flex
                            mt="lg"
                            gap={"lg"}>
                            <TextInput
                                withAsterisk
                                label="Royalties"
                                leftSection={
                                    <MdPercent />
                                }
                                placeholder='Royalties'
                                value={royalties}
                                onChange={e => setRoyalties(e.target.value)} />
                            <TextInput
                                withAsterisk
                                label="Properties"
                                leftSection={
                                    <AiFillPropertySafety />
                                }
                                placeholder='Properties'
                                value={properties}
                                onChange={e => setProperties(e.target.value)} />̦
                        </Flex>
                    </Box>
                    <Flex
                        justify={"center"}>
                        <Button
                            radius={"lg"}
                            size='md'
                            onClick={handleClick}
                            disabled={isLoading}>{isLoading && <Loader size={"sm"} color="white" mr={"sm"} />}Upload</Button>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}

export default UploadNFT