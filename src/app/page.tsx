import React from  "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MyNFTsPage from '../components/MyNFTsPage';
import Link from 'next/link';
import MintNewNFTsPage from '../components/MintNewNFTsPage';

export default async function Index() {
    return (
        <React.Fragment>
            <MintNewNFTsPage/>
        </React.Fragment>
    
    );
}
