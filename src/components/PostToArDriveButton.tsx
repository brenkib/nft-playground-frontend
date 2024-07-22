"use client"
import React from  "react";

const postFile = async (fileInfo: {filePath: string; folderId: string}) => {
    const response = await fetch(process.env.URL + "/api/ardrive", {
        method: "POST",
        body: JSON.stringify(fileInfo),
    });
    return response.json();
};

export default function PostToArDriveButton({ filePath }: { filePath?: string }) {
    const onUploadClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        return postFile({
            "filePath": filePath ? filePath : "/public/nft1.png",
            "folderId": process.env.PUBLIC_NFT_FOLDER_ID as string,
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
