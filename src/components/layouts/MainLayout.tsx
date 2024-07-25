import React from  "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import PostToArWeaveButton from '../PostToArWeaveButton';
import PostToArDriveButton from '../PostToArDriveButton';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            <div className={'flex justify-between p-6'}>
                <div>
                    <Link className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'} href={"/"}>Mint NFTs</Link>
                    <Link className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'} href={"my-nfts"}>My NFTs</Link>
                    <Link className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'} href={"the-graph-fetching"}>The Graph Demo</Link>
                    <PostToArWeaveButton/>
                    <PostToArDriveButton/>
                </div>
                <ConnectButton />
            </div>
            {children}

        </React.Fragment>

    );
}
