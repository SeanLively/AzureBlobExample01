const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  // Enter your storage account name
  const account = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
  const containerName = process.env.CONTAINER_NAME || "";

  const defaultAzureCredential = new DefaultAzureCredential();

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    defaultAzureCredential
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);  
 
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log("\t", blob.name);
  }

}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});

