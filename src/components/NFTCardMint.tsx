import React from 'react';
import { SyntheticEvent } from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { contractAddress, wagmiABI } from '../utils/wagmiContract';
import { sepolia } from 'wagmi/chains';
import { Address } from 'viem';
import { metadataLoader } from '../utils/metadataLoader';
import { NFTMetadata } from '../utils/types';
import Image from 'next/image';

interface NFTCardProps {
    image: string;
    name: string;
    description?: string;
    metaDataURI: string;
}

export const NFTCardMint = ({ image, name, description, metaDataURI }: NFTCardProps) => {
    const { address, isConnected } = useAccount();

    const { data: hash, writeContract } = useWriteContract()
    async function mintNewNFT(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        writeContract({
            address: contractAddress,
            abi: wagmiABI,
            functionName: 'safeMint',
            args: [address as Address, metaDataURI],
            chainId: sepolia.id,
        })
    }
    /*   const {
   /*     data: mint,
         error,
         isPending,
     } = useReadContract({
         abi: wagmiABI,
         address: contractAddress,
         functionName: 'tokenOfOwnerByIndex',
         args: [address as Address, BigInt(tokenIndex)],
         chainId: sepolia.id,
     } as const);*/

    const placeholderImage = './no-image-icon.png';
    const onImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = placeholderImage;
    };

    return (
        <React.Fragment>
            <div
                className={
                    'min-h-[350px] my-4 flex w-fit flex-col justify-center items-center rounded-3xl border border-lightGreen p-4 hover:border-mainText'
                }
            >
                <div>
                    <Image
                        src={image}
                        alt={name}
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
                <h2 className={'text-2xl'}>{name}</h2>
                <p>{description}</p>
                <p>{`Collection: ${contractAddress}`}</p>
                {isConnected && address ?
                    <div>
                        <button
                            className={
                                'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'
                            }
                            onClick={(event) => mintNewNFT(event)}
                        >
                            Mint
                        </button>
                    </div>
                    :
                    <div className={"text-mainTextHover italic"}>Connect Wallet To Mint</div>
                }

                {hash && <div>Transaction Hash: {hash.substring(0,8)}...</div>}
            </div>
        </React.Fragment>
    );
};
