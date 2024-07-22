export const copyToClipboard = async (value: string) => {
  try {
    return await navigator.clipboard.writeText(value);
  } catch (e) {
      console.log("failed to copy", (e as Error).message);
  }
};