import { readJWKFile, arDriveFactory, wrapFileOrFolder, EID } from 'ardrive-core-js';
export const dynamic = 'force-dynamic'; // defaults to auto
const WALLET_PATH = process.env.WALLET_PATH as string;


//Upload file to ar-drive permastorage
export async function POST(request: Request) {
    const res = await request.json();
    const { driveId, folderId, filePath } = res;
    // Read wallet from file
    const myWallet = readJWKFile(WALLET_PATH);
    const walletAddress = await myWallet.getAddress();
    // Construct ArDrive class
    const arDrive = arDriveFactory({
        wallet: myWallet
    });
    // const drive = await arDrive.getPublicDrive({ driveId, owner: walletAddress});
    const folder = await arDrive.getPublicFolder({ folderId, owner: walletAddress})

    // Wrap file for upload
    const wrappedEntity = wrapFileOrFolder(filePath);

    // Construct a safe Entity ID Type
    //const destFolderId = EID(crypto.randomUUID());

    // Upload a public file to destination folder
    const uploadFileResult = await arDrive.uploadAllEntities({
        entitiesToUpload: [{ wrappedEntity, destFolderId: folder.folderId }]
    });


    return Response.json(uploadFileResult, { status: 200 });
}
