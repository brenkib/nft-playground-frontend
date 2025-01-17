import Arweave from 'arweave';

const initOptions = {
    host: "arweave.net", // Hostname or IP address for a Arweave host
    port: 443, // Port
    protocol: "https", // Network protocol http or https
    timeout: 20000, // Network request timeouts in milliseconds
    logging: false, // Enable network request logging
};
export const arweave = Arweave.init(initOptions);
