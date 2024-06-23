import { Box } from '@mantine/core'
import React from 'react'
import { MdNotifications } from 'react-icons/md'

function Notification() {
  return (
    <Box mt={"xs"}>
      <MdNotifications size={28} />
    </Box>
  )
}

export default Notification