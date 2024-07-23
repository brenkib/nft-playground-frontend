import React, { useCallback } from 'react';
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { contractAddress, wagmiABI } from '../utils/wagmiContract';
import { Address } from 'viem';
import { sepolia } from 'wagmi/chains';

export function useMintNFT(address: Address, tokenURI: string) {
    const { data: simulatedContract, error: simulateError } = useSimulateContract({
        address: contractAddress,
        abi: wagmiABI,
        functionName: 'safeMint',
        args: [address, tokenURI],
        chainId: sepolia.id,
    });

    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract();
    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed
    } = useWaitForTransactionReceipt({ hash });

    const wrappedWriteContract = useCallback(() => {
        if(simulatedContract?.request && !simulateError) {
            writeContract(simulatedContract.request);
        }
    }, [simulateError, simulatedContract?.request, writeContract]);


    return { hash, error, isPending, writeContract: wrappedWriteContract, isConfirming, isConfirmed };
}