import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import ShowError from "./ShowError";

export default function RepoDescription() {
  const isLoading = useSelector((state) => state.repo.isLoading);
  const isError = useSelector((state) => state.repo.isError);
  return (
    <div className="repo-description">
      {isLoading && <Loader></Loader>}
      {isError && <ShowError errormessage="something went wrong" />}
    </div>
  );
}
