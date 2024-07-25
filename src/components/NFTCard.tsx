import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { contractAddress, wagmiABI } from '../utils/wagmiContract';
import { sepolia } from 'wagmi/chains';
import { Address } from 'viem';
import { metadataLoader } from '../utils/metadataLoader';
import { NFTMetadata } from '../utils/types';
import { NFTCardView } from './NFTCardView';

interface NFTCardProps {
    tokenIndex: number;
}

export const NFTCard = ({ tokenIndex }: NFTCardProps) => {
    const [nftMetadata, setNftMetaData] = React.useState<NFTMetadata>();
    const { address } = useAccount();
    const { data: tokenId, error, isPending, } = useReadContract({ abi: wagmiABI, address: contractAddress, functionName: 'tokenOfOwnerByIndex', args: [address as Address, BigInt(tokenIndex)], chainId: sepolia.id, } as const);
    
    
    const { data: tokenURI, error: errorOnTokenUri, isPending: isPendingTokenUI, } = useReadContract({ abi: wagmiABI, address: contractAddress, functionName: 'tokenURI', args: [tokenId as bigint], chainId: sepolia.id, query: { enabled: !isPending && tokenId !== undefined, }, } as const);
    if (tokenURI) {
        metadataLoader(tokenURI, res => setNftMetaData(res), () => {});
    }

    return (
        <React.Fragment>
            {tokenId && nftMetadata ? (
               <NFTCardView name={nftMetadata.name} tokenId={tokenId} description={nftMetadata.description} image={nftMetadata.image} />
            ) : (
                <div></div>
            )}
        </React.Fragment>
    );
};
