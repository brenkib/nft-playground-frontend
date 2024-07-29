'use client';
import React from 'react';
import { useWallets, usePrivy } from '@privy-io/react-auth';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { usePrivySmartAccount } from '@zerodev/privy';
/*import { useKernelClient } from '@zerodev/waas';*/

export default function ConnectOptions() {
    // Privy hooks
    const { ready, user, authenticated, login, connectWallet, logout, linkWallet } = usePrivy();
    const { wallets, ready: walletsReady } = useWallets();

    // WAGMI hooks
    const { address, isConnected, isConnecting, isDisconnected } = useAccount();
    const { disconnect} = useDisconnect();

    const { zeroDevReady, user: zeroDevUser, logout: zeroLogout } = usePrivySmartAccount();

    return <>
        <div className={'flex justify-start gap-4 mb-2'}>
            <div>Wagmi: {address || 'Not Connected'}</div>
            |
            <div>Privy: {user?.wallet?.address || 'Not Connected'}</div>
            |
            <div>ZeroDev: {zeroDevReady &&  zeroDevUser?.wallet?.address || 'Not Connected'}</div>
        </div>


        <div className={"flex justify-between"}>
            <div className="flex flex-col justify-between align-middle items-start gap-4">
                <div className={'flex items-center align-middle'}>Rainbow Toolkit Connect Wagmi: <ConnectButton /></div>

                {ready && !authenticated && (
                    <>
                        <button className={'mx-2 rounded-3xl bg-blue-500 px-4 py-2 text-white'} onClick={login}
                                title="Login with Privy">Privy with Wagmi through Privy SDK
                        </button>
                        <button disabled={isConnected}
                                className={'mx-2 disabled:cursor-not-allowed rounded-3xl bg-blue-500 px-4 py-2 text-white'}
                                onClick={connectWallet}
                                title={isConnected ? 'Already Connected with Wagmi' : 'Connect only Wagmi'}>Only Wagmi
                            through Privy SDK
                        </button>
                    </>
                )}
            </div>
            <div className={"flex gap-4"}>
                {
                    ready && authenticated ?
                        <div>
                            <button
                                className={'m-2 disabled:cursor-not-allowed rounded-3xl bg-blue-500 px-4 py-2 text-white'}
                                onClick={logout}>Logout from Privy
                            </button>
                        </div>
                        :
                        <></>
                }
                {
                    address ?
                        <div>
                            <button
                                className={'m-2 disabled:cursor-not-allowed rounded-3xl bg-blue-500 px-4 py-2 text-white'}
                                onClick={() => disconnect()}>Logout from Wagmi
                            </button>
                        </div>
                        :
                        <></>
                }
                {
                    zeroDevReady && zeroDevUser?.wallet?.address ?
                        <div>
                            <button
                                className={'m-2 disabled:cursor-not-allowed rounded-3xl bg-blue-500 px-4 py-2 text-white'}
                                onClick={zeroLogout}>Logout from ZeroDev
                            </button>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>


        {/*{ready && authenticated && (
            <>
                <p className="mt-2">You are logged in with privy.</p>
                <textarea
                    value={JSON.stringify(wallets, null, 2)}
                    className="mt-2 w-full rounded-md bg-slate-700 p-4 font-mono text-xs text-slate-50 sm:text-sm"
                    rows={JSON.stringify(wallets, null, 2).split('\n').length}
                    disabled
                />
                <textarea
                    value={JSON.stringify(user, null, 2)}
                    className="mt-2 w-full rounded-md bg-slate-700 p-4 font-mono text-xs text-slate-50 sm:text-sm"
                    rows={JSON.stringify(user, null, 2).split('\n').length}
                    disabled
                />
                <br />
            </>
        )}*/}


    </>;
}