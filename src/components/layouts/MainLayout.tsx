import React from 'react';
import Link from 'next/link';
import PostToArWeaveButton from '../ardrive/PostToArWeaveButton';
import PostToArDriveButton from '../ardrive/PostToArDriveButton';
import ConnectOptions from '../ConnectOptions';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <div className={'p-6'}>
                <ConnectOptions />
            </div>
            <div className={'flex justify-between px-6 '}>
                <div>
                    <Link className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'} href={'zeroDev-login'}>ZeroDev Login</Link>
                    <Link className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'} href={'/'}>Mint NFTs</Link>
                    <Link className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'} href={'my-nfts'}>My
                        NFTs</Link>
                    <Link className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'} href={'the-graph-fetching'}>The
                        Graph Demo</Link>
                    <PostToArWeaveButton />
                    <PostToArDriveButton />
                </div>
            </div>
            {children}
        </React.Fragment>

    );
}
