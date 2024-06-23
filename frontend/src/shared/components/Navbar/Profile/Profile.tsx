import { useNFTMarketplace } from '@/shared/context/NFTMarketplaceContext';
import { Avatar, Box, Button, Center, Divider, Drawer, HoverCard, Menu, ModalBaseProps, ScrollArea, Text, UnstyledButton, rem } from '@mantine/core'
import Link from 'next/link';
import React from 'react'

interface IProfile {

}
const data: any[] = [];
function Profile({ }: IProfile) {
  const { accountBalance, connectWallet } = useNFTMarketplace();
  return (

    <Menu
      shadow="lg"
      width={200}
      trigger="hover"
      openDelay={100}
      closeDelay={100}>
      <Menu.Target>
        <Button
          size='md'
          variant='transparent'>
          <Avatar size={"md"}>DT</Avatar>
        </Button>

      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          Balance: {accountBalance.slice(0, 6)} ETH
        </Menu.Item>
        <Menu.Item>
          <Button
            size='sm'
            w={"100%"}
            onClick={connectWallet}>Connect Wallet</Button>
        </Menu.Item>
        {
          data.map(i => (
            <Menu.Item key={i.name}>
              <Link href={i.href}>{i.name}</Link>
            </Menu.Item>
          ))
        }
      </Menu.Dropdown>
    </Menu>
  )
}

export default Profile