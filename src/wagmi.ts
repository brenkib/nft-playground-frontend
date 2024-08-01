import {createConfig} from '@privy-io/wagmi';
import {
    mainnet,
    sepolia,
} from 'wagmi/chains';
import { http } from 'wagmi';
const PROJECT_ID = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || '';
import { passkeyConnector } from '@zerodev/wallet';

export const config = createConfig({
    chains: [mainnet, sepolia], // Pass your required chains as an array
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        // For each of your required chains, add an entry to `transports` with
        // a key of the chain's `id` and a value of `http()`
    },
    connectors: [
        passkeyConnector(PROJECT_ID, sepolia, "v3", "BrenkibNFTApp"),
        passkeyConnector(PROJECT_ID, mainnet, "v3", "BrenkibNFTApp")
    ],
});