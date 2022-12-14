import type { ChangeEvent } from "react";
import { useState } from "react";
import { useUploadIPFS } from "../hooks/upload";

export const UploadIPFS = () => {
  const [image, setImage] = useState<File>();

  /** Upload to IPFS */
  const { uploadIPFS } = useUploadIPFS();

  const saveImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const getUri = async () => {
    if (image) {
      const uri = await uploadIPFS({ image });
      console.log(uri);
      return uri;
    }
  };

  return (
    <div>
      <p>Upload to IPFS</p>
      <div>
        <input
          type={"file"}
          className="file-input w-full max-w-xs"
          onChange={(e) => saveImage(e)}
          placeholder="upload file"
        />
        <button onClick={() => getUri()}>Upload</button>
      </div>
    </div>
  );
};
