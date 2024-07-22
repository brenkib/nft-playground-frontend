import { arweave } from '../../../utils/arweave-init';
import { NFTMetadata } from '../../../utils/types';

export const dynamic = 'force-dynamic'; // defaults to auto

const ARDRIVE_KEY = process.env.ARDRIVE_KEY;

/* GET should return metadata by transaction ID */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const tx = searchParams.get('tx');
    if (!tx) {
        return Response.json({message: 'no tx found'}, { status: 404 });
    }

    const transaction =  await arweave.transactions.get(tx);
    console.log(transaction);

    return Response.json({ transaction });
}


//Upload metdata file to ar-drive
export async function POST(request: Request) {
    const res = await request.json();
    const metaContentType = ["Content-Type", "application/json"];
    const tx = await runUpload(res, metaContentType);
    const metadataUrl = tx
        ? `https://arweave.net/${tx}`
        : undefined;

    if (!metadataUrl) { return Response.json({ message: 'Metadata upload failed' }, { status: 400 }); }

    return Response.json({ tx }, { status: 200 });
}

const runUpload = async (data: NFTMetadata, contentType: Array<string>, isUploadByChunk = false) => {
    if (!ARDRIVE_KEY) return;

    const key = JSON.parse(ARDRIVE_KEY);
    const tx = await arweave.createTransaction({ data: JSON.stringify(data) }, key);
    tx.addTag(contentType[0], contentType[1]);

    await arweave.transactions.sign(tx, key);
    await arweave.transactions.post(tx);

    //   console.log("url", `https://arweave.net/${tx.id}`);
    return tx;
};
