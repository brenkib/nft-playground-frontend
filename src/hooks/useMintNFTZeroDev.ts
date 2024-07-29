import React, { useCallback } from 'react';
import { contractAddress, wagmiABI } from '../utils/wagmiContract';
import { Address, encodeFunctionData } from 'viem';
import { usePrivySmartAccount } from '@zerodev/privy';
import { sepolia } from 'wagmi/chains';

export function useMintNFTZeroDev(address: Address, tokenURI: string) {
    const { ready, authenticated, user, zeroDevReady, sendTransaction, logout } =
        usePrivySmartAccount();

    const mint = React.useCallback((onSuccess = (hash: string) => {}, onError = (error: Error) => {}, onFinnaly = () => {}) => {
        return sendTransaction({
            to: contractAddress,
            data: encodeFunctionData({
                abi: wagmiABI,
                functionName: "safeMint",
                args: [address, tokenURI],
            }),
            chainId: sepolia.id,
        }).then(onSuccess).catch(onError).finally(onFinnaly);
    }, [address, sendTransaction, tokenURI]);


    return { mintNFT: mint };
}