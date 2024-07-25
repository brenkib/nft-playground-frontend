import { NFTMetadata } from './types';

export async function metadataLoader(url: string, onSuccess = (res: NFTMetadata) => {}, onError = (error: Error) => {}) {
    try {
        const response = await fetch(url);
        const json: NFTMetadata = await response.json();
        onSuccess(json);
        return json;
    } catch(error) {
        onError(error as Error);
        console.error(error);
    }
}