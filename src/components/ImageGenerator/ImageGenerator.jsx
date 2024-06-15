import React, { useRef, useState } from "react";

import "./imagegenerator.css";

import default_image from "../../assets/default_image.svg";

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const resp = await fetch(`https://api.limewire.com/api/image/generation`, {
      method: "POST",
      mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        "X-Api-Version": "v1",
        Accept: "application/json",
        Authorization:
          `Bearer lmwr_sk_i3tePWL7tC_fKeTtpXjBCUa07102QdiNATZN1vGD8tVmtAXJ`,
      },
      body: JSON.stringify({
        prompt: `${inputRef}`,
        aspect_ratio: "1:1",
      }),
    });

    const data = await resp.json();
    console.log(data);
    // setImage_url(data_array[0].url);
    // setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url === "/" ? default_image : image_url} alt="" />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
        <div className="search-box">
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Describe what you want to see"
          />
          <div
            className="generate-btn"
            onClick={() => {
              imageGenerator();
            }}
          >
            Generate
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
