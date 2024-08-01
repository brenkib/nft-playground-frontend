'use client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from '@privy-io/wagmi';
import { PrivyProvider } from '@privy-io/react-auth';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ZeroDevProvider } from '@zerodev/privy';

import { config } from '../wagmi';
import { privyConfig } from '../privy';


const queryClient = new QueryClient();
const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID || '';
const ZERODEV_PROJECT_ID = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || '';

export function Providers({ children }: { children: React.ReactNode }) {
    return (

        <ZeroDevProvider projectId={ZERODEV_PROJECT_ID}>
            <PrivyProvider appId={PRIVY_APP_ID} config={privyConfig}>
                <QueryClientProvider client={queryClient}>
                    <WagmiProvider config={config}>
                        <RainbowKitProvider>{children}</RainbowKitProvider>
                    </WagmiProvider>
                </QueryClientProvider>
            </PrivyProvider>
        </ZeroDevProvider>

    );
}
