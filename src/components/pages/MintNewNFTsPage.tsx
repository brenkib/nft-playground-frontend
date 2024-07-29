"use client"

import PageWrapper from '../PageWrapper';
import { NFTCardMint } from '../nft/NFTCardMint';
import { NFTCardMintActions } from '../nft/NFTCardMintActions';

export default function MintNewNFTsPage() {
    const nft1ImageURI = "https://arweave.net/lMKuh-SWrLtIXKvwJgxsLHt6WHhj4-xOc5e3a_M1jQ4";
    const nft2ImageURI = "https://arweave.net/r7_VawuZwZpMN_va_6aX3TR2q-trkfIkzAg0v-i1cqI/nft2.png";

    const metaDataURI1 = "https://arweave.net/uGsun6UTDCuqpCj9nC9yQALz98tWVUJZ2GJItUBsB3U";
    const metaDataURI2 = "https://arweave.net/1yobfGRVPz1d3WPbF_09PrDKITFHC89xRAScvRoiKzA";

    return <PageWrapper>
        <div>Ready to mint BrenkibNFTs</div>
        <div className={"flex gap-4 flex-wrap"}>
            <NFTCardMint metaDataURI={metaDataURI1} image={nft1ImageURI} name={"nft1"}
                         description={"Brenkibs First NFT"} />
            <NFTCardMintActions metaDataURI={metaDataURI2} image={nft2ImageURI} name={"nft2"}
                         description={"Brenkibs Second NFT"} />
        </div>
    </PageWrapper>;
}
