import { type BaseError, useReadContract } from 'wagmi';
import { contractAddress, wagmiABI } from '../../utils/wagmiContract';
import type { Address } from 'viem';
import { sepolia } from 'wagmi/chains';
import { NFTCard } from './NFTCard';

export const NFTListForAddress = ({ address }: { address: Address }) => {
    const { data: balance, error, isPending,
    } = useReadContract({
        abi: wagmiABI,
        address: contractAddress,
        functionName: 'balanceOf',
        args: [address],
        chainId: sepolia.id,
    } as const);

    if (isPending) return <div>Loading...</div>;

    if (error)
        return (
            <div>
                Error:{' '}
                {(error as unknown as BaseError).shortMessage || error.message}
            </div>
        );
    
    if (balance <= 0) return <div>You do not have any BrenkibNFT...=(</div>;
    

    return (
        <div>
            <div>Your BrenkibNFT Balance: {balance?.toString()}</div>
            <div className={"flex gap-4 flex-wrap"}>
                {[...Array(Number(balance))].map((x, i) =>
                    <NFTCard tokenIndex={i} key={i} />
                )}
            </div>
            
        </div>
    );
};
