import { Player } from "@livepeer/react";
import { parseArweaveTxId, parseCid } from "livepeer/media";

/* Used MUI for the styling box and TextField . */
import { Box, TextField } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { getFilesFromPath, Web3Storage } from "web3.storage";
import images from "./RandomAvatar.svg";

export const DecentralizedStoragePlayback = () => {
  const [url, setUrl] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [name, setName] = useState();
  const [avatar, setAvatar] = useState();
  const [walletAddress, setWalletAddress] = useState(
    "0x493789c3A5215672ecC6F7153f09a0ADC11A053e"
  );
  useEffect(() => {
    const ipfsURI = searchParams.get("url");
    fetch(ipfsURI + "metadata.json")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTitle(res.title);
        setDescription(res.description);
        res.name ? setName(res.name) : setName("Peter");
        res.avatar ? setAvatar(res.avatar) : setAvatar(images);
        // setWalletAddress(res.walletAddress);
        setWalletAddress("0x493789c3A5215672ecC6F7153f09a0ADC11A053e");
      });
    setUrl(ipfsURI + "PREVIEW.mp4");
  }, []);
  const makeGatewayURLImage = (imgCID, imgName) => {
    return `https://${imgCID}.ipfs.w3s.link/${imgName}`;
  };
  const idParsed = parseCid(url) ?? parseArweaveTxId(url);

  return (
    <>
      {name ? (
        <div className="grid">
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
            <div className="flex">
              <img src={avatar} className="avatar" alt="profile pic" />
              <div>
                <h3>{name}</h3>
                <p className="address">
                  {walletAddress.slice(0, 5) +
                    "...." +
                    walletAddress.slice(
                      walletAddress.length - 5,
                      walletAddress.length
                    )}
                </p>
              </div>
            </div>
            <p className="description">{description}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};
