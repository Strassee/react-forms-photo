import React, { useState, useRef } from "react";
import ImgPreview from "./ImgPreview";

function Photo() {
  const [images, setImages] = useState([]);
  const inputFile = useRef(null);
  const fileToDataUrl = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
    
      fileReader.addEventListener('load', evt => {
        resolve(evt.currentTarget.result);
      });
      
      fileReader.addEventListener('error', evt => {
        reject(new Error(evt.currentTarget.error));
      });
      
      fileReader.readAsDataURL(file);
    });
  }
  
  const handleSelect = async (evt) => {
      let files = [...evt.target.files];
      console.log(evt.target.files);
      const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
      setImages((prevData) => {
        const arr = [];
        let index = prevData.length !== 0 ? prevData[prevData.length - 1]['id'] + 1 : 0;
        urls.map((url) => (
          arr.push({'id': index++, 'img': url})
        ));
        return prevData.concat(arr);
      });
      inputFile.current.value = "";
  }

  const handleClose = (e, delImage) => {
    setImages((prevData) => (
        prevData.filter((image) => image !== delImage)
    ));
  }

  return (
    <div className="main">
      <label className='' htmlFor="files">
        <div className="area">
          <div className="clickText">Click to select</div>
          <div className="inputFiles">
            <input type="file" onChange={handleSelect} id="files" name="files" multiple accept="image/*" ref={inputFile} />
          </div>
        </div>
      </label>
        {images.length !== 0? <ImgPreview images={images} handleClose={handleClose} /> : ''}
    </div>
    )
  }
  
  export default Photo;