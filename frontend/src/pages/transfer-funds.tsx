import React, { useCallback, useEffect, useState } from 'react'

import styles from "@/styles/transferFunds.module.css";
import { useNFTMarketplace } from '@/shared/context/NFTMarketplaceContext';
import Image from 'next/image';
import { FaEthereum, FaUserAlt } from 'react-icons/fa';
import { Box, Button, Card, Container, Flex, Grid, Loader, Modal, Text, TextInput, Textarea, Title } from '@mantine/core';
import { LazyLottie } from '@/shared/components/LazyLottie';
import { useDisclosure } from '@mantine/hooks';


function TransferFunds() {
    const { currentAccount, transferEther, isLoading, accountBalance, transactions, transactionCount, getAllTransactions } = useNFTMarketplace();
    const [transferAccount, setTransferAccount] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [message, setMessage] = useState("");
    const [readMessage, setReadMessage] = useState("");
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        getAllTransactions();
    }, []);

    const handleTransferFunds = useCallback(async () => {
        await transferEther(transferAccount, transferAmount, message);
        window.location.reload();
    }, [message, transferAccount, transferAmount, transferEther]);

    return (
        <Container size="xl">
            <Box className={styles.transfer}>
                <Box className={styles.transfer_box}>
                    <Title order={1}>Transfer Ether</Title>
                    <Box component='p'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat ab
                        voluptatibus dolorem consequatur, quo, natus delectus doloremque
                        temporibus odit ducimus minus voluptates ullam sapiente accusantium
                        fugit praesentium commodi enim recusandae sequi dolores explicabo modi
                        tenetur alias labore! Necessitatibus, obcaecati. Velit officia culpa magni
                        quis aperiam nemo et odit. Omnis, sapiente?
                    </Box>
                    <Box my="lg" className={styles.transfer_box_box}>
                        <Grid
                            align="center">
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Box className={styles.transfer_box_box_left}>
                                    <LazyLottie
                                        getAnimationData={() => import('@/assets/crypto-transfer.json')}
                                        loop
                                        id="empty-box"
                                        width={60}
                                        height={60}
                                        style={{ height: 400, }}
                                    />
                                </Box>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, md: 6 }}>
                                <Box className={styles.transfer_box_box_right}>
                                    <Title order={2}>Now you can transfer ether</Title>
                                    <Card
                                        mt="md"
                                        shadow="sm"
                                        padding="lg"
                                        radius="md"
                                        withBorder
                                        className={styles.transfer_box_box_right_info}>
                                        <Box
                                            component='p'
                                            visibleFrom='md'
                                            className={styles.transfer_box_box_right_info_desktop}>Account: {currentAccount}</Box>
                                        <Box
                                            component='p'
                                            hiddenFrom='md'
                                            className={styles.transfer_box_box_right_info_mobile}>Account: {currentAccount.slice(1, 30)}..</Box>
                                        <Box>Balance: {accountBalance} ETH</Box>
                                    </Card>
                                    <Flex
                                        direction={"column"}
                                        gap={"md"}
                                        mt={"md"}
                                        className={styles.transfer_box_box_right_box}>
                                        <TextInput
                                            withAsterisk
                                            leftSection={<FaUserAlt />}
                                            placeholder='Address*'
                                            onChange={e => setTransferAccount(e.target.value)} />

                                        <TextInput
                                            min={1}
                                            withAsterisk
                                            leftSection={<FaEthereum />}
                                            placeholder='ETH'
                                            onChange={e => setTransferAmount(e.target.value)} />
                                        <Textarea
                                            cols={30}
                                            rows={6}
                                            placeholder='Your message in few words'
                                            onChange={e => setMessage(e.target.value)}
                                        />

                                        <Button
                                            onClick={handleTransferFunds}
                                            disabled={isLoading}>{isLoading && <Loader size={"sm"} color="white" mr={"sm"} />}Transfer Funds</Button>
                                    </Flex>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Box>
                    <Title order={2} mt="lg" className={styles.transfer_box_h1}>
                        Transaction History
                    </Title>
                    <Box
                        component='p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni atque consectetur fugiat sunt? Officiis corrupti labore quasi dolores eligendi distinctio ut maxime magnam nisi rerum?</Box>
                    <Grid
                        mt={"md"}
                        className={styles.transfer_box_history}>
                        {
                            transactions.map((el, i) => {
                                return (
                                    <Grid.Col
                                        span={{ base: 12, md: 4, lg: 4 }}
                                        key={i + 1}>
                                        <Card
                                            shadow="sm"
                                            padding="lg"
                                            radius="md"
                                            withBorder
                                            className={styles.transfer_box_history_item}>
                                            <Image
                                                src={"/images/transfer-ether.gif"}
                                                width={80}
                                                height={80}
                                                alt='transferEther'
                                            />
                                            <Box mt={"md"} className={styles.transfer_box_history_item_info}>
                                                <Text component='p'>
                                                    <Text component='strong'>Transfer ID: </Text>
                                                    <Text component='span'>#{i + 1} {el.timestamp}</Text>
                                                </Text>
                                                <Text component='p'>
                                                    <Text component='strong'>Amount:</Text> {el.amount} ETH
                                                </Text>
                                                <Text component='p'>
                                                    <Text component='strong'>From: </Text>
                                                    <Text component='span'>{el.addressFrom}</Text>
                                                </Text>
                                                <Text component='p'>
                                                    <Text component='strong'>To: </Text>
                                                    <Text component='span'>{el.addressTo}</Text>
                                                </Text>
                                                <Button
                                                    mt={"md"}
                                                    fullWidth
                                                    onClick={() => {
                                                        setReadMessage(el.message);
                                                        open()
                                                    }}>Read Message</Button>
                                            </Box>
                                        </Card>
                                    </Grid.Col>
                                )
                            })
                        }
                    </Grid>
                    <Modal opened={opened} onClose={close} title="Transaction Message" centered>
                        <Text size="sm" component='p'>
                            {readMessage}
                        </Text>
                    </Modal>

                </Box>
            </Box>
        </Container>
    )
}

export default TransferFunds