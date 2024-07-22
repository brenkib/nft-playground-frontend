"use client"

import { useAccount } from 'wagmi';
import { NFTListForAddress } from './NFTListForAddress';
import PageWrapper from './PageWrapper';

export default function MainPageComponent() {
    const {isConnected, address} = useAccount();
    return <PageWrapper>
        {!isConnected || !address ?
            <div>Please Connect Wallet to view BrenkibNFTs</div>
            :
            <div>
                <NFTListForAddress address={address} />
            </div>
        }
    </PageWrapper>;
}
