import React from 'react';
import { SyntheticEvent } from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';
import { useAccount, useReadContract } from 'wagmi';
import { contractAddress, wagmiABI } from '../utils/wagmiContract';
import { sepolia } from 'wagmi/chains';
import { Address } from 'viem';
import { metadataLoader } from '../utils/metadataLoader';
import { NFTMetadata } from '../utils/types';
import Image from 'next/image';

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
    

    const placeholderImage = './no-image-icon.png';
    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = placeholderImage;
    };

    return (
        <React.Fragment>
            {nftMetadata ? (
                <div
                    className={
                        'my-4 min-h-[350px] flex w-fit flex-col justify-center items-center rounded-3xl border border-lightGreen p-4 hover:border-mainText'
                    }
                >
                    <div>
                        <Image
                            src={
                                nftMetadata.image
                                    ? nftMetadata.image
                                    : placeholderImage
                            }
                            alt={nftMetadata.name}
                            width={0}
                            height={0}
                            onError={onImageError}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: '100%',
                                maxHeight: '200px',
                                maxWidth: '100px',
                            }}
                        />
                    </div>
                    <h2 className={'text-2xl'}>{nftMetadata.name}</h2>
                    <p>{nftMetadata.description}</p>
                    <p>Id: {Number(tokenId)}</p>

                    <p>{`Collection: ${contractAddress}`}</p>
                    <div>
                        <button
                            className={
                                'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'
                            }
                            onClick={() => copyToClipboard(contractAddress)}
                        >
                            Copy
                        </button>

                        <button
                            className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'}
                            onClick={() => copyToClipboard(contractAddress)}
                        >
                            Transfer
                        </button>
                    </div>


                    <div>
                        <a
                            target="_blank"
                            href={`https://sepolia.etherscan.io/token/${contractAddress}`}
                        >
                            View on etherscan
                        </a>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </React.Fragment>
    );
};
