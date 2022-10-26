import React, { useRef, useState, useEffect } from "react";
import {
    //   Stack,
    TextField,
    IconButton,
    InputAdornment,
    Grid, Button
} from "@material-ui/core";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  useEffect(() => {
    if (typeof props.avatar == "string") {
      setPreviewUrl(props.avatar);
    }
  }, [props.avatar]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;

      props.onInput(pickedFile, true);
    } else {
      setIsValid(false);
      fileIsValid = false;
      props.onInput(null, false);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div style={{ padding: "0 0 0 0" }}>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {props.error && <p style={{color:"red",textAlign:"center"}}>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
