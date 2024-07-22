import React from  "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MainPageComponent from '../components/MainPageComponent';

export default async function Index() {
    return (
        <React.Fragment>
            <div className={'flex justify-end p-6'}>
                <ConnectButton />
            </div>
            
            <div>
                <MainPageComponent />
            </div>
        </React.Fragment>
    
    );
}
