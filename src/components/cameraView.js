import React, { useState } from 'react';
import OpenCamera from './camera';
import CameraPreview from './cameraPreview';

function CameraView ({loading , setLoading , navigation}){
    const [file , setFile] = useState({ uri: '' , type: '' });

    const changeFile = (file) =>{
        setFile(file);
    }

    return(
        file.uri 
        ? 
        <CameraPreview loading={loading} setLoading={setLoading} file={file} changeFile={changeFile} fromGallery={false}></CameraPreview> 
        :
        <OpenCamera loading={loading} setLoading={setLoading} changeFile={changeFile} navigation={navigation}></OpenCamera>
    );
}

export default CameraView;