'use client';

import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export default function ZeroDevLogin() {
    const { ready, authenticated, login, logout } = usePrivy();
    const router = useRouter();

    React.useEffect(() => {
        if (ready && authenticated) {
            router.push("/zeroDev/mint");
        }
    }, [ready, authenticated, router]);

    return (
        <React.Fragment>
            Login With Privy
        </React.Fragment>

    );
}
