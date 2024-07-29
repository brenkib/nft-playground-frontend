'use client';

import React from 'react';
import { useCreateKernelClientPasskey } from '@zerodev/waas';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export default function ZeroDevLogin() {

    const { connectRegister, isPending } = useCreateKernelClientPasskey({ version: 'v3' });
    const { ready, authenticated, login, logout } = usePrivy();
    const router = useRouter();

    React.useEffect(() => {
        if (ready && authenticated) {
            router.push("/zeroDev-login/mint");
        }
    }, [ready, authenticated, router]);

    return (
        <React.Fragment>

            <button
                className={'mx-2 rounded-3xl bg-green-700 px-4 py-2 text-white'}
                disabled={isPending}
                onClick={() => {
                    connectRegister({ username: 'zerodev_quickstart' });
                }}
            >
                {isPending ? 'Connecting...' : 'Create Smart Account'}
            </button>

        </React.Fragment>

    );
}
