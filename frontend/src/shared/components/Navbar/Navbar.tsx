"use client"
import React, { useState } from 'react'

import { BsSearch } from 'react-icons/bs';

import style from "@/shared/components/Navbar/Navbar.module.css";
import Image from 'next/image';
import { useNFTMarketplace } from '@/shared/context/NFTMarketplaceContext';
import Link from 'next/link';
import { Box, Button, Container, Group, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Discover, HelpCenter, Notification, Profile, Sidebar } from "@/shared/components/Navbar";
import { ColorSchemeToggle } from '../ColorSchemeToggle';

function Navbar() {
    const { currentAccount, connectWallet } = useNFTMarketplace();
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);


    const openMenu = (e: any) => {
        const btnText = e.target.innerText;
        if (btnText === "Discover") {
            setDiscover(true);
        }
    }

    return (
        <Container size={"xl"}>
            <Box className={style.navbar}>
                <Group
                    justify='space-between'
                    h="100%"
                    className={style.navbar_container}>

                    <Group
                        h="100%"
                        gap={"lg"}
                        visibleFrom="sm"
                        className={style.navbar_container_left}>
                        <Link href={"/"} className={style.logo}>
                            <Image
                                width={100}
                                height={100}
                                src={"/images/logo.svg"}
                                alt='NFT Marketplace' />
                        </Link>
                        <Box className={style.navbar_container_left_box_input}>
                            <Box className={style.navbar_container_left_box_input_box}>
                                <TextInput
                                    size='md'
                                    radius={"lg"}
                                    type="text"
                                    placeholder='Search NFT'
                                    rightSection={<BsSearch onClick={() => { }} className={style.search_icon} />} />
                            </Box>
                        </Box>
                    </Group>

                    <Group
                        gap={"xl"}
                        align='center'
                        className={style.navbar_container_right}>
                        <Box className={style.navbar_container_right_discover}>
                            <Discover />
                        </Box>
                        <Box className={style.navbar_container_right_help_center}>
                            <HelpCenter />
                        </Box>
                        <Box className={style.navbar_container_right_help_notification}>
                            <Notification />
                        </Box>

                        <Box className={style.navbar_container_right_button}>
                            {
                                currentAccount === "" ?
                                    <Button
                                        onClick={connectWallet}>Connect</Button>
                                    :
                                    <Button
                                        size='md'
                                        radius={"xl"}
                                        component={Link}
                                        href={"/create-nft"}
                                        color='gray'
                                    >Create</Button>
                            }
                        </Box>
                        <Box className={style.navbar_container_right_profile}>
                            <Profile />
                        </Box>
                        <ColorSchemeToggle />
                    </Group>
                </Group>
            </Box>
        </Container>
    )
}

export default Navbar