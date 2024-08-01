import React from 'react';
import { BaseError, useAccount } from 'wagmi';
import { contractAddress } from '../../utils/wagmiContract';
import { Address, encodeFunctionData } from 'viem';
import Image from 'next/image';
import { usePrivySmartAccount } from '@zerodev/privy';
import { useMintNFTZeroDev } from '../../hooks/useMintNFTZeroDev';

interface NFTCardProps {
    image: string;
    name: string;
    description?: string;
    metaDataURI: string;
}

export const NFTCardMintZeroDev = ({ image, name, description, metaDataURI }: NFTCardProps) => {
    const { user, zeroDevReady } = usePrivySmartAccount();
    const { address } = useAccount()
    const { mintNFT, isLoading, error } = useMintNFTZeroDev(address as Address, metaDataURI);

    async function mintNewNFT(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!zeroDevReady || !user?.wallet?.address) {
            console.error('Wallet has not fully initialized yet');
            return;
        }
        mintNFT();
    }

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
                {zeroDevReady && user?.wallet?.address ?
                    <div>
                        <button
                            disabled={isLoading}
                            className={
                                'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'
                            }
                            onClick={(event) => mintNewNFT(event)}
                        >
                            {isLoading ? 'Confirming...' : 'Mint'}
                        </button>
                    </div>
                    :
                    <div className={'text-mainTextHover italic'}>Connect Wallet To Mint</div>
                }

                {error && (
                    <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                )}
            </div>
        </React.Fragment>
    );
};
