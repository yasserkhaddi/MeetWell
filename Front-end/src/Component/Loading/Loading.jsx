import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import "../../Styles/loading/loading.css";
export default function Loading() {
  return (
    <div className="loading_modal">
      <div className="loading_abc">
        <ScaleLoader
          color={"rgb(177, 152, 107)"}
          size={200}
          width={9}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
