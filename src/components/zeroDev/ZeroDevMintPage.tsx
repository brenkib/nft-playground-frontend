'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { usePrivySmartAccount } from '@zerodev/privy';
import { NFTCardMintZeroDev } from '../nft/NFTCardMintZeroDev';

export default function ZeroDevMintPage() {
    const router = useRouter();
    const { ready, authenticated, user, zeroDevReady, sendTransaction, logout } =
        usePrivySmartAccount();
    const { wallets } = useWallets();
    const [isLoading, setIsLoading] = React.useState(false);
    const eoa = wallets.find((wallet) => wallet.walletClientType === "privy") || wallets[0];

    React.useEffect(() => {
        if (ready && !authenticated) {
            router.push("/zeroDev-login");
        }
    }, [ready, authenticated, router]);


    const nft1ImageURI = "https://arweave.net/lMKuh-SWrLtIXKvwJgxsLHt6WHhj4-xOc5e3a_M1jQ4";
    const nft2ImageURI = "https://arweave.net/r7_VawuZwZpMN_va_6aX3TR2q-trkfIkzAg0v-i1cqI/nft2.png";

    const metaDataURI1 = "https://arweave.net/uGsun6UTDCuqpCj9nC9yQALz98tWVUJZ2GJItUBsB3U";
    const metaDataURI2 = "https://arweave.net/1yobfGRVPz1d3WPbF_09PrDKITFHC89xRAScvRoiKzA";
    return (
        <React.Fragment>
            <p>MINT HERE with EOA: {eoa?.address}</p>
            <p>ZeroDev Wallet Address: {user?.wallet?.address}</p>
            <p>zeroDevReady: {String(zeroDevReady)}</p>

            <div className={"my-4 flex gap-4 flex-wrap"}>
                <NFTCardMintZeroDev metaDataURI={metaDataURI1} image={nft1ImageURI} name={"nft1"}
                             description={"Brenkibs First NFT"} />
                <NFTCardMintZeroDev metaDataURI={metaDataURI2} image={nft2ImageURI} name={"nft2"}
                                    description={"Brenkibs Second NFT"} />
            </div>
        </React.Fragment>

    );
}
