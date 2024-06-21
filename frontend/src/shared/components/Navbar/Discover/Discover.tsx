import { Box, Button, Flex, HoverCard, Menu, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { BiChevronDown } from 'react-icons/bi'

function Discover() {
  const data = [
    {
      name: "Collection",
      href: "/collection"
    },
    {
      name: "Search",
      href: "/search"
    },
    {
      name: "Author Profile",
      href: "/author-profile"
    },
    {
      name: "NFT details",
      href: "/nft-details"
    },
    {
      name: "Create NFT",
      href: "/create-nft"
    },
    {
      name: "Connect Wallet",
      href: "/connect-wallet"
    },
    {
      name: "Blog",
      href: "/blog"
    }
  ]
  return (
    <Menu
      shadow="lg"      
      width={200}
      trigger="hover"
      openDelay={100}
      closeDelay={100}>
      <Menu.Target>
        <Button
          variant='white'
          color='dark'
          >
          <Text>Discover</Text>
          <BiChevronDown
            size={22}
          />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
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

export default Discover