import React from "react";

const Section_5 = () => {
  return (
    <div className="relative w-full h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="
          absolute top-1/2 left-1/2
          w-auto h-auto
          min-w-full min-h-full
          max-w-[100vw] max-h-[100%]
          -translate-x-1/2 -translate-y-1/2
          object-contain md:object-cover
        "
      >
        <source
          src="https://res.cloudinary.com/ds9v1rpfi/video/upload/v1770396589/vid_fyfxur.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Section_5;