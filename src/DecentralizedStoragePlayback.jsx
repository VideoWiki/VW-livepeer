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
  useEffect(() => {
    setUrl(searchParams.get("url"));
  }, []);
  const makeGatewayURLImage = (imgCID, imgName) => {
    return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
  };
  const idParsed = parseCid(url) ?? parseArweaveTxId(url);

  return (
    <>
      {/*URL box that takes the IPFS url consisting of video link */}
      {/* Livepeer Player that plays the video from the url */}
      {idParsed && (
        <Player
          title={idParsed.id}
          src={url}
          autoUrlUpload={{ fallback: true, ipfsGateway: "https://w3s.link" }}
        />
      )}
    </>
  );
};
