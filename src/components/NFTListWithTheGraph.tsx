import type { Address } from 'viem';
import { gql, request } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { NFTCardView } from './NFTCardView';

interface TheGraphResponse {
    tokens: {
        tokenID: bigint;
        tokenURI: string;
        createdAtTimestamp: bigint;
        ardriveURI: {
            image: string
            name: string
            description: string
        }
    }[];
}

const q = gql`
    query ($owner: String!) {
        tokens(where: {owner: $owner}) {
            tokenID
            createdAtTimestamp
            ardriveURI {
                image
                name
                description
            }
        }
    }`;

const url = 'https://api.studio.thegraph.com/query/84593/brenkibnftsubgraph/version/latest';

export const NFTListWithTheGraph = ({ address }: { address: Address }) => {
    const { data, status } = useQuery({
        queryKey: ['data'],
        async queryFn() {
            return await request<TheGraphResponse>(url, q, { owner: address });
        },
    });

    if (data && data.tokens.length <= 0) return <div>You do not have any BrenkibNFT...=(</div>;

    return (
        <div>
            <div>Your BrenkibNFT Balance: {data?.tokens.length}</div>
            <div className={'flex gap-4 flex-wrap'}>
                {data?.tokens.map((x, i) =>
                    <NFTCardView
                        tokenId={x.tokenID}
                        image={x.ardriveURI.image}
                        name={x.ardriveURI.name}
                        description={x.ardriveURI.description}
                        key={i}
                    />,
                )}
            </div>

        </div>
    );
};
