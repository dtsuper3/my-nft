import { Container, MantineSize } from '@mantine/core'
import React from 'react'

interface ICreateNFT {
    children: React.ReactNode;
    size?: MantineSize | (string & {}) | number;
}
function MainLayout({ children, size = "xl" }: ICreateNFT) {
    return (
        <Container size={size}>{children}</Container>
    )
}

export default MainLayout