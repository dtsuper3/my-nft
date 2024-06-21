import React, { useCallback, useMemo, useState } from 'react'
import { Dropzone as MantineDropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import '@mantine/dropzone/styles.css';
import { Box, Card, Flex, Group, Image, SimpleGrid, Text, Title, rem } from '@mantine/core';
import { MdCancel, MdPhoto, MdUploadFile } from 'react-icons/md';

interface IDropZone {
    title: string;
    heading: string;
    subHeading: string;
    itemName?: string;
    website?: string;
    description?: string;
    royalties?: string;
    fileSize?: number;
    category?: string;
    image?: string;
    properties?: string;
    uploadFile: (file: any) => void
}
function DropZone({
    fileSize = 5 * 1024 ** 2,
    heading,
    subHeading,
    title,
    category,
    description,
    itemName,
    royalties,
    website,
    properties,
    uploadFile
}: IDropZone) {
    const [file, setFile] = useState<FileWithPath>();
    const [isLoading, setIsLoading] = useState(false);
    const previews = useMemo(() => {
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            return <Image
                src={imageUrl}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
                alt='file' />
        }
        return null

    }, [file]);

    const onDrop = useCallback(async (files: FileWithPath[]) => {
        try {
            setIsLoading(true);
            if (files.length > 0) {
                await uploadFile(files[0]);
                setFile(files[0]);
            }
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
        }
    }, [uploadFile])

    return (
        <Box>


            <MantineDropzone
                loading={isLoading}
                onDrop={onDrop}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={fileSize}
                accept={IMAGE_MIME_TYPE}>
                <Flex
                    direction={"column"}
                    justify="space-between"
                    align={"center"}
                    gap="lg"
                    mih={220}
                    style={{ pointerEvents: 'none' }}>
                    <MantineDropzone.Accept>
                        <MdUploadFile
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                        />
                    </MantineDropzone.Accept>
                    <MantineDropzone.Reject>
                        <MdCancel
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                        />
                    </MantineDropzone.Reject>

                    <Title order={3}>{title}</Title>
                    <MantineDropzone.Idle>
                        <Flex
                            direction={"column"}
                            align={"center"}>
                            <Text size="md" inline>
                                {heading}
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                {subHeading}
                            </Text>
                            <MdPhoto
                                style={{
                                    width: rem(100),
                                    height: rem(100),
                                    color: 'var(--mantine-color-dimmed)'
                                }}
                            />
                        </Flex>
                    </MantineDropzone.Idle>
                </Flex>
            </MantineDropzone>
            {
                file &&
                <Card
                    mt={"lg"}
                    withBorder
                    shadow='xs'>
                    <SimpleGrid cols={{ base: 1, sm: 4 }} mt={file ? 'xl' : 0}>
                        {previews}
                        <Box>
                            <Text>NFT Name</Text>
                            <Text>{itemName}</Text>
                        </Box>
                        <Box>
                            <Text>Website</Text>
                            <Text>{website}</Text>
                        </Box>
                        <Box>
                            <Text>Description</Text>
                            <Text>{description}</Text>
                        </Box>
                        <Box>
                            <Text>Category</Text>
                            <Text>{category}</Text>
                        </Box>
                        <Box>
                            <Text>Royalties</Text>
                            <Text>{royalties}</Text>
                        </Box>
                        <Box>
                            <Text>Properties</Text>
                            <Text>{properties}</Text>
                        </Box>
                    </SimpleGrid>
                </Card>
            }
        </Box>
    )
}

export default DropZone