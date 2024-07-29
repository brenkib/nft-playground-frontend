import { http } from "viem"
import { sepolia } from "viem/chains"
import { createConfig } from "@zerodev/waas"
const PROJECT_ID = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID;

export const zeroDevConfig = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http()
    },
    projectIds: {
        [sepolia.id]: PROJECT_ID
    }
})