import React from  "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MyNFTsPage from '../../components/pages/MyNFTsPage';

export default async function Index() {
    return (
        <React.Fragment>
            <div>
                <MyNFTsPage />
            </div>
        </React.Fragment>
    
    );
}
