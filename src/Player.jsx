import React from "react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { Navigate, useSearchParams } from "react-router-dom";
import { DecentralizedStoragePlayback } from "./DecentralizedStoragePlayback";

export function Player(props) {
  /* livepeer Client using our api key  */
  console.log(props);
  const client = createReactClient({
    provider: studioProvider({
      apiKey: "45087818-a31a-4541-9892-fe8e0a06145d",
    }),
  });
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("url"));

  return (
    <div className="padding hidden">
      <LivepeerConfig client={client}>
        <DecentralizedStoragePlayback />
      </LivepeerConfig>
    </div>
  );
}
