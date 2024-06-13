import React, { useState } from 'react'

import { MdNotifications } from "react-icons/md";
import { BsSearch } from 'react-icons/bs';
import { CgMenuLeft, CgMenuRight } from 'react-icons/cg';
import { Button } from "@/shared/components";

import style from "@/shared/components/Navbar/Navbar.module.css";
import Image from 'next/image';
import Discover from './Discover/Discover';

function Navbar() {
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);

    const openMenu = e => {
        const btnText = e.target.innerText;
        if (btnText === "Discover") {
            setDiscover(true);
        }
    }

    return (
        <div className={style.navbar}>
            <div className={style.navbar_container}>

                <div className={style.navbar_container_left}>
                    <div className={style.logo}>
                        <Image
                            width={100}
                            height={100}
                            src={"/images/logo.svg"}
                            alt='NFT Marketplace' />
                    </div>
                    <div className={style.navbar_container_left_box_input}>
                        <div className={style.navbar_container_left_box_input_box}>
                            <input type="text" placeholder='Search NFT' />
                            <BsSearch onClick={() => { }} className={style.search_icon} />
                        </div>
                    </div>
                </div>

                <div className={style.navbar_container_right}>
                    <div className={style.navbar_container_right_discover}>
                        <p onClick={() => { }}>Discover </p>
                        <div className={style.navbar_container_right_discover_box}>
                            <Discover />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar