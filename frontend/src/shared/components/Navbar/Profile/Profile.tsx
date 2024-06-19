import { Avatar, Box, Center, Divider, Drawer, HoverCard, ModalBaseProps, ScrollArea, Text, UnstyledButton, rem } from '@mantine/core'
import React from 'react'

interface IProfile {

}
function Profile({ }: IProfile) {
  return (
    <HoverCard shadow='md'>
      <HoverCard.Target>
        <Avatar >DT</Avatar>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm">
          Hover card is revealed when user hovers over target element, it will be hidden once
          mouse is not over both target and dropdown elements
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

export default Profile