"use client"

import React from  "react";
import { NFTMetadata } from '../utils/types';

const postMetadata = async (metadata: NFTMetadata) => {
    const response = await fetch("/api/ar-drive", {
        method: "POST",
        body: JSON.stringify(metadata),
    });
    return response.json();
};

export default function PostMetadataButton() {
    const onUploadClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        return postMetadata({
            "description": "Brenkib Test Upload NFT",
            "external_url": "",
            "image": "https://arweave.net/lMKuh-SWrLtIXKvwJgxsLHt6WHhj4-xOc5e3a_M1jQ4",
            "name": "Test Upload Metadata",
            "attributes": []
        });
    }

    return (
        <React.Fragment>
            <button className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'} onClick={onUploadClicked}>
                Test Upload to Ardrive
            </button>
        </React.Fragment>

    );
}
