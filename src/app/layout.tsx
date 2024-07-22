import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { Inter as FontSans } from 'next/font/google';

import { Providers } from './providers';
import { cn } from '../utils/cn';
import React from 'react';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={cn(fontSans.variable)}
            suppressHydrationWarning
        >
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

export default RootLayout;
