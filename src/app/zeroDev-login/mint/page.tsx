import React from 'react';
import PageWrapper from '../../../components/PageWrapper';
import ZeroDevMintPage from '../../../components/zeroDev/ZeroDevMintPage';

export default async function Page() {
    return (
        <PageWrapper>
            <div className={"w-full flex flex-col justify-center align-middle items-center"}>
                <h2 className={"text-3xl p-4"}>ZeroDev Mint Page</h2>
            </div>
            <ZeroDevMintPage/>
        </PageWrapper>

    );
}
