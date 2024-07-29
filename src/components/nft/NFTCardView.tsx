import React from 'react';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { contractAddress, wagmiABI } from '../../utils/wagmiContract';
import Image from 'next/image';

interface NFTCardProps {
    tokenId: bigint;
    image: string
    name: string
    description?: string
}

export const NFTCardView = ({ tokenId, image, name,  description}: NFTCardProps) => {
    return (
        <React.Fragment>
            <div
                className={
                    'my-4 min-h-[350px] flex w-fit flex-col justify-center items-center rounded-3xl border border-lightGreen p-4 hover:border-mainText'
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
        </React.Fragment>
    );
};
