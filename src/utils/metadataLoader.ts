export async function metadataLoader(url: string, onSuccess: (data: any) => void, onError: (error: Error) => void): Promise<void> {
    try {
        const response = await fetch(url);
        const json = await response.json();
        onSuccess(json);
        return json;
    } catch(error) {
        onError(error as Error);
        console.error(error);
    }
}