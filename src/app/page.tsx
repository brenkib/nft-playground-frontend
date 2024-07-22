import React from  "react";
import MintNewNFTsPage from '../components/MintNewNFTsPage';


async function getMetadataForNFT() {
    const result = await fetch(process.env.URL + '/api/ar-drive', {method: 'GET'});
    if (result.ok) {
        return result.json();
    }
    return {};
}

export default async function Index() {
    const metadata = await getMetadataForNFT();
    return (
        <React.Fragment>
            <MintNewNFTsPage/>
        </React.Fragment>
    
    );
}
