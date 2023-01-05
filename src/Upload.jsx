import React, { useEffect } from "react";
import { getFilesFromPath, Web3Storage } from "web3.storage";
import { Navigate, useSearchParams } from "react-router-dom";

export default function Upload() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYxZUMxQTlhMDc5NDNlQjBjMTcwQWZhMjcxNTY4MTg4NDA5YzAyRWIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzA5NDQ2OTA5MjUsIm5hbWUiOiJiZWx1Z2EifQ.A2JdUCF0vKXJXGlaTKJ1pBNIDLT2MWa4m8OGHpCWfIA",
    });
    console.log(client);
    console.log(searchParams.get("url"));
    fetch(searchParams.get("url")).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], "VC.mp4", { contentType });
      console.log(file);
      const imgCID = await client.put([file], { name: file.name });
      console.log(makeGatewayURLImage(imgCID, file.name));
    });
  }, []);
  const makeGatewayURLImage = (imgCID, imgName) =>
    `https://${imgCID}.ipfs.w3s.link/${imgName}`;
  return <div>Uploading....</div>;
}
