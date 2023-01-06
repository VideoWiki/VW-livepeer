import { Player } from "@livepeer/react";
import { parseArweaveTxId, parseCid } from "livepeer/media";

/* Used MUI for the styling box and TextField . */
import { Box, TextField } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { getFilesFromPath, Web3Storage } from "web3.storage";

export const DecentralizedStoragePlayback = () => {
  const [url, setUrl] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  useEffect(() => {
    const ipfsURI = searchParams.get("url");
    fetch(ipfsURI + "metadata.json")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTitle(res.title);
        setDescription(res.description);
        res.name ? setName(res.name) : setName("Peter");
      });
    setUrl(ipfsURI + "PREVIEW.mp4");
  }, []);
  const makeGatewayURLImage = (imgCID, imgName) => {
    return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
  };
  const idParsed = parseCid(url) ?? parseArweaveTxId(url);

  return (
    <>
      <div className="flex">
        <div className="video">
          {idParsed && (
            <Player
              src={url}
              autoUrlUpload={{
                fallback: true,
                ipfsGateway: "https://w3s.link",
              }}
            />
          )}
        </div>
        <div className="content">
          <h1>{title}</h1>
          <h4>By: {name}</h4>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
};
