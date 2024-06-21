import { Avatar, Box, Button, Center, Divider, Drawer, HoverCard, Menu, ModalBaseProps, ScrollArea, Text, UnstyledButton, rem } from '@mantine/core'
import Link from 'next/link';
import React from 'react'

interface IProfile {

}
function Profile({ }: IProfile) {
  const data = [
    {
      name: "a",
      href: "/a"
    }
  ];
  return (

    <Menu
      shadow="lg"
      width={200}
      trigger="hover"
      openDelay={100}
      closeDelay={100}>
      <Menu.Target>
        <Button
          variant='transparent'>
          <Avatar>DT</Avatar>
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

export default Profile