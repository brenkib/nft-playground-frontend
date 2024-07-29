"use client"

import { useAccount } from 'wagmi';
import { NFTListForAddress } from '../nft/NFTListForAddress';
import PageWrapper from '../PageWrapper';

export default function MyNFTsPage() {
    const {isConnected, address} = useAccount();
    return <PageWrapper>
        {!isConnected || !address ?
            <div>Please Connect Wallet to view BrenkibNFTs</div>
            :
            <NFTListForAddress address={address} />
        }
    </PageWrapper>;
}
