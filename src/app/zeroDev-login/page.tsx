import React from 'react';
import ZeroDevLogin from '../../components/zeroDev/ZeroDevLogin';
import PageWrapper from '../../components/PageWrapper';

export default async function Page() {
    return (
        <PageWrapper>
            <div className={"w-full flex flex-col justify-center align-middle items-center"}>
                <h2 className={"text-3xl p-4"}>ZeroDevLoginPage</h2>

                <ZeroDevLogin/>
            </div>


        </PageWrapper>

    );
}
