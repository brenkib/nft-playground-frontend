import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { contractAddress, wagmiABI } from '../utils/wagmiContract';
import { sepolia } from 'wagmi/chains';
import { Address } from 'viem';
import { metadataLoader } from '../utils/metadataLoader';
import { NFTMetadata } from '../utils/types';
import { NFTCardView } from './NFTCardView';
import { useQuery } from '@tanstack/react-query';

interface NFTCardProps {
    tokenIndex: number;
}

export const NFTCard = ({ tokenIndex }: NFTCardProps) => {
    const { address } = useAccount();
    const { data: tokenId, error, isPending } = useReadContract({
        abi: wagmiABI,
        address: contractAddress,
        functionName: 'tokenOfOwnerByIndex',
        args: [address as Address, BigInt(tokenIndex)],
        chainId: sepolia.id,
    } as const);


    const { data: tokenURI, error: errorOnTokenUri, isPending: isPendingTokenUI } = useReadContract({
        abi: wagmiABI,
        address: contractAddress,
        functionName: 'tokenURI',
        args: [tokenId as bigint],
        chainId: sepolia.id,
        query: { enabled: !isPending && tokenId !== undefined },
    } as const);

    const { data: nftMetadata, status } = useQuery({
        queryKey: ['nftMetadata', Number(tokenId as BigInt)],
        enabled: !!tokenURI,
        async queryFn() {
            return await metadataLoader(tokenURI as string);
        },
    });

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
