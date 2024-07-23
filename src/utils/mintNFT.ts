import { simulateContract, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { Address } from 'viem';
import { sepolia } from 'wagmi/chains';
import { config } from '../wagmi';
import { contractAddress, wagmiABI } from './wagmiContract';

export async function mintNFT(address: Address, tokenURI: string) {
    const simulateResult = await simulateContract(config,{
        address: contractAddress,
        abi: wagmiABI,
        functionName: 'safeMint',
        args: [address, tokenURI],
        chainId: sepolia.id,
    });

    const writeResult = await writeContract(config, simulateResult.request);

    const txReceiptResult = await waitForTransactionReceipt(config, { hash: writeResult });

    return { hash: txReceiptResult.transactionHash, status: txReceiptResult.status };
}