import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/shared/theme';
import { NFTMarketplaceContextProvider } from '@/shared/context/NFTMarketplaceContext';
import { Footer, Navbar } from '@/shared/components';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

export const metadata = {
    title: 'Mantine Next.js template',
    description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <NFTMarketplaceContextProvider>
                        <Notifications />
                        <Navbar />
                        {children}
                        <Footer />
                    </NFTMarketplaceContextProvider>
                </MantineProvider>
            </body>
        </html>
    );
}