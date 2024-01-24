import React from "react";

const ImageRenderer = ({ nicImage }) => {
  console.log("🚀 ~ ImageRenderer ~ nicImage:", nicImage);
  if (!nicImage || !nicImage.data) {
    // Handle case where nicImage or its data is undefined
    return <div>No Image Available</div>;
  }

  //  const imageUrl = 'data:image/jpeg;base64,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'
  const arrayBufferToBase64 = (nicImage) => {
    let binary = "";
    let bytes = new Uint8Array(nicImage);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    console.log("object,", window.btoa(binary));
    const base64String = window.btoa(binary);
    console.log("Base64 encoded string:", base64String);
    const base64Image = window.btoa(binary);
    const decodedString = atob(base64Image);

    return decodedString;
  };

  return (
    <div>
      <img
        src={arrayBufferToBase64(nicImage.data)}
        alt="Rendered Image"
        style={{  height: '80vh' }}
      />
    </div>
  );
};

export default ImageRenderer;
