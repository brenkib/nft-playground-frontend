import React, { useCallback } from 'react';
import { contractAddress, wagmiABI } from '../utils/wagmiContract';
import { Address } from 'viem';
import { sepolia } from 'wagmi/chains';
import { useWriteContracts } from 'wagmi/experimental';
import { useConnectors } from 'wagmi';

export function useMintNFTZeroDev(address: Address, tokenURI: string) {
    const { data, writeContracts, isPending, error } = useWriteContracts();
    const connectors = useConnectors();
    const wrappedWriteContract = useCallback(() => {
        writeContracts({
            contracts: [
                {
                    address: contractAddress,
                    abi: wagmiABI,
                    functionName: "safeMint",
                    args: [address, tokenURI],
                },
                {
                    address: contractAddress,
                    abi: wagmiABI,
                    functionName: "safeMint",
                    args: [address, tokenURI],
                },
            ],
            capabilities: {
                paymasterService: {
                    url: 'https://rpc.zerodev.app/api/v2/paymaster/7393dbf2-fb38-417c-a631-fb843db210e4'
                }
            },
            connector: connectors[0],
            chainId: sepolia.id,
        });
    }, [address, connectors, tokenURI, writeContracts]);


    return { mintNFT: wrappedWriteContract, isLoading: isPending, error, hash: data };
}