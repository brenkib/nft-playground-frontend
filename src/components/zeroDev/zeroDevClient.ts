/**
 * This example assumes your app is wrapped with the `PrivyProvider` and
 * is configured to create embedded wallets for users upon login. Aside from
 * the imports, all of the code in this snippet must be used within a React component
 * or context.
 */
import { ConnectedWallet } from '@privy-io/react-auth';
import { sepolia } from 'viem/chains'; // Replace this with the chain used by your application
import { createPublicClient, http, type Transport, type Chain } from 'viem';
import { providerToSmartAccountSigner, ENTRYPOINT_ADDRESS_V07 } from 'permissionless';
import {
    createZeroDevPaymasterClient,
    createKernelAccountClient,
    createKernelAccount,
    KernelAccountClient, KernelSmartAccount,
} from '@zerodev/sdk';
import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator';
import { KERNEL_V3_1 } from '@zerodev/sdk/constants';
import { EntryPoint } from 'permissionless/types';


export const zeroDevClient = async (wallets: ConnectedWallet[]) => {
    // Find the embedded wallet and get its EIP1193 provider
    const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
    if (!embeddedWallet) return;
    const provider = await embeddedWallet.getEthereumProvider();
    if (!provider) return;
// Use the EIP1193 `provider` from Privy to create a `SmartAccountSigner`
    // @ts-ignore
    const smartAccountSigner = await providerToSmartAccountSigner(provider);

// Initialize a viem public client on your app's desired network
    const publicClient = createPublicClient({
        transport: http(sepolia.rpcUrls.default.http[0]),
    });

// Create a ZeroDev ECDSA validator from the `smartAccountSigner` from above and your `publicClient`
    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
        signer: smartAccountSigner,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        kernelVersion: KERNEL_V3_1,
    });

// Create a Kernel account from the ECDSA validator
    const account = await createKernelAccount(publicClient, {
        plugins: {
            sudo: ecdsaValidator,
        },
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        kernelVersion: KERNEL_V3_1,
    });

// Create a Kernel client to send user operations from the smart account
    const kernelClient = createKernelAccountClient({
        account,
        chain: sepolia,
        entryPoint: ENTRYPOINT_ADDRESS_V07,
        bundlerTransport: http('insert-your-bundler-RPC-from-the-dashboard'),
        middleware: {
            // See https://docs.zerodev.app/sdk/core-api/sponsor-gas
            sponsorUserOperation: async ({ userOperation }) => {
                const zerodevPaymaster = createZeroDevPaymasterClient({
                    chain: sepolia,
                    entryPoint: ENTRYPOINT_ADDRESS_V07,
                    transport: http('insert-your-paymaster-RPC-from-the-dashboard'),
                });
                return zerodevPaymaster.sponsorUserOperation({
                    userOperation,
                    entryPoint: ENTRYPOINT_ADDRESS_V07,
                });
            },
        },
    });
    return kernelClient as KernelClient;
};

export type KernelClient = KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>