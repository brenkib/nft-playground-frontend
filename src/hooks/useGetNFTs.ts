import React from 'react';
import { useReadContract } from 'wagmi';
import { contractAddress, wagmiABI } from '../utils/wagmiContract';
import { Address } from 'viem';
import { sepolia } from 'wagmi/chains';
import { useQuery } from '@tanstack/react-query';
import { metadataLoader } from '../utils/metadataLoader';

export function useGetNFT(address: Address, tokenIndex: number) {
    const { data: tokenId, isPending } = useReadContract({
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


    return { nftMetadata, tokenId, tokenURI, status };
}