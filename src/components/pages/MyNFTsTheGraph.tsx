"use client"

import { useAccount } from 'wagmi';
import PageWrapper from '../PageWrapper';
import { NFTListWithTheGraph } from '../nft/NFTListWithTheGraph';

export default function MyNFTsTheGraph() {
    const {isConnected, address} = useAccount();
    return <PageWrapper>
        {!isConnected || !address ?
            <div>Please Connect Wallet to view BrenkibNFTs</div>
            :
            <NFTListWithTheGraph address={address} />
        }
    </PageWrapper>;
}
