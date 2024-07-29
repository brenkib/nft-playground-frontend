import React from 'react';
import { useAccount } from 'wagmi';
import { Address } from 'viem';
import { NFTCardView } from './NFTCardView';
import { useGetNFT } from '../../hooks/useGetNFTs';

interface NFTCardProps {
    tokenIndex: number;
}

export const NFTCard = ({ tokenIndex }: NFTCardProps) => {
    const { address } = useAccount();
    const { tokenId, nftMetadata} = useGetNFT(address as Address, tokenIndex);

    return (
        <React.Fragment>
            {tokenId !== undefined && nftMetadata ? (
                <NFTCardView name={nftMetadata.name} tokenId={tokenId} description={nftMetadata.description}
                             image={nftMetadata.image} />
            ) : (
                <div></div>
            )}
        </React.Fragment>
    );
};
