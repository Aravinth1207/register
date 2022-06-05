import React, { useState, useRef } from 'react';
import { ImageConfig } from './config/ImageConfig'
import uploadImg from './assets/cloud-upload-regular-240.png';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { LinearProgress } from '@mui/material';
;

const UploadResume = props => {
    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const [progress, setProgress] = useState(0);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover')

    const onFileDrop = (e) => {

        const newFile = e.target.files[0];
        e.preventDefault();
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);

            const URL = "http://localhost:5000/uploader";

            const formData = new FormData();
            formData.append('file', (newFile));
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100) / total);
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`);
                    setProgress(percent);

                }
            }
            axios.post(URL, formData, config).then(res => {
                if (res.status === 200) {
                    props.showSet(true);
                }
            })
        }


    }

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
        const delURL = "http://localhost:8080/delete";
        const delData = new FormData();
        delData.append('filename', (fileList[0].name));
        console.log(delData)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(delURL, delData, config).then(res => {
            if (res.status === 200) {
                console.log(res)
                props.showSet(false);
            }
        })
    }
    return (
        <>
            {
                fileList.length !== 1 ?
                    (
                        <div
                            ref={wrapperRef}
                            className="drop-file-input"
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDrop={onDrop}
                        >
                            <div>
                                <div className="drop-file-input__label">
                                    <img src={uploadImg} alt="" />
                                    <p>Upload Your Resume</p>
                                </div>
                                <input type="file" onChange={onFileDrop} />
                            </div>
                        </div>
                    ) : null
            }
            {
                fileList.length > 0 &&
                <div className="drop-file-preview">
                    {
                        fileList.map((item, index) => (
                            <div key={index} className="drop-file-preview__item">
                                <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                <div className="drop-file-preview__item__info">
                                    <p>{item.name}</p>
                                    <p>{(item.size / 1024).toFixed(2)}KB</p>
                                    {progress > 0 &&
                                        <LinearProgress variant="determinate" value={progress} sx={{ width: "300px", margin: "auto" }} />
                                    }
                                </div>
                                <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                            </div>
                        ))
                    }

                </div>
            }
            <br />
        </>
    );
}


UploadResume.propTypes = {
    onFileChange: PropTypes.func,
    showSet: PropTypes.func

}

export default UploadResume;
