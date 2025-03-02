interface BtnDownloadProps {
  url: URL;
}

export const BtnDownload = ({ url }: BtnDownloadProps) => {
  let lastClicked = 0;

  const handleDownload = async () => {
    const now = Date.now();
    if (now - lastClicked <= 1000) return;

    lastClicked = now;

    const media = await fetch(url.href);
    const mediaBlob = await media.blob();
    const mediaURL = URL.createObjectURL(mediaBlob);

    const anchorDownload = document.createElement("a");
    anchorDownload.href = mediaURL;
    anchorDownload.download = url.pathname
    anchorDownload.click();

    URL.revokeObjectURL(mediaURL);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-light text-white font-semibold px-4 py-2 rounded-md cursor-pointer"
    >
      Download
    </button>
  );
};
