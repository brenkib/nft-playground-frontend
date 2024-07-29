import React from 'react';
import { SyntheticEvent } from 'react';
import { BaseError, useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { contractAddress, wagmiABI } from '../../utils/wagmiContract';
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
    const { user, zeroDevReady, sendTransaction } = usePrivySmartAccount();
    const { mintNFT } = useMintNFTZeroDev(user?.wallet?.address as Address, metaDataURI);
    const [txHash, setTxHash] = React.useState<string>();
    const [error, setError] = React.useState<Error>();
    const [loading, setLoading] = React.useState<boolean>(false);

    async function mintNewNFT(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!zeroDevReady || !user?.wallet?.address || !sendTransaction) {
            console.error('Wallet has not fully initialized yet');
            return;
        }
        setLoading(true);
        await mintNFT((hash) => setTxHash(hash), (err) => setError(err), () => setLoading(false));
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
                            disabled={loading}
                            className={
                                'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'
                            }
                            onClick={(event) => mintNewNFT(event)}
                        >
                            {loading ? 'Confirming...' : 'Mint'}
                        </button>
                    </div>
                    :
                    <div className={'text-mainTextHover italic'}>Connect Wallet To Mint</div>
                }

                {txHash && <div>Transaction Hash: {txHash.substring(0, 8)}...</div>}

                {error && (
                    <div>Error: {(error as BaseError).shortMessage || error.message}</div>
                )}
            </div>
        </React.Fragment>
    );
};
