import React, { useState } from 'react';
import { SyntheticEvent } from 'react';
import { BaseError, useAccount } from 'wagmi';
import { contractAddress, wagmiABI } from '../../utils/wagmiContract';
import { Address, Hash } from 'viem';
import Image from 'next/image';
import { mintNFT } from '../../utils/mintNFT';

interface NFTCardProps {
    image: string;
    name: string;
    description?: string;
    metaDataURI: string;
}
interface MintResult {
    hash: Hash;
    status: string;
}

export const NFTCardMintActions = ({ image, name, description, metaDataURI }: NFTCardProps) => {
    const { address, isConnected } = useAccount();
    const [data, setData] = useState<MintResult>();
    const [isLoading, setLoading] = useState(false);

    async function mintNewNFT(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLoading(true);
        const result = await mintNFT(address as Address, metaDataURI);
        setData(result);
        setLoading(false);
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
                {isConnected && address ?
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

                {data?.hash && <div>Transaction Hash: {data.hash.substring(0, 8)}...</div>}

                {isLoading && <div>Waiting for confirmation...</div>}
                {data?.status === "success" && <div>Transaction confirmed.</div>}

            </div>
        </React.Fragment>
    );
};
