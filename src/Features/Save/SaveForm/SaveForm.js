import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const downloadFile = require('../../../downloadFile');

const SaveForm = ({ type, setType, setApiResponse }) => {
    const [selectedFile, setSelectedFile] = useState();
    const [filename, setFilename] = useState();
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingGetFile, setLoadingGetFile] = useState(false);
    const [filenameInput, setFilenameInput] = useState();
    const [downloadName, setDownloadName] = useState('');


    //post file to /api/save
    const handleSubmitFile = (event) => {
        setLoadingSave(true);
        event.preventDefault();
        let formData = new FormData();
        formData.append("file", selectedFile);
        let url = '/api/save';
        axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            setFilename(response.data);
            setLoadingSave(false);
        }).catch((error) => {
            if (error.response.data) {
                setApiResponse(error.response.data);
            } else {
                alert(error);
            }
            setLoadingSave(false);
        });
    }

    //read file using /api/file
    const handleGetFile = (event) =>{
        setLoadingGetFile(true);
        event.preventDefault();
        let formData = new FormData();
        formData.append("file", selectedFile);
        axios({
            method: 'GET',
            url: `/api/file?filename=${filenameInput}&t=${type}&name=${downloadName}`
        }).then((response) => {
            if (type == 'file') {
                var workbook = response.data.workbook;
                var filename = response.data.newName;
                var byteCharacters = atob(workbook);
                var byteNumbers = new Array(byteCharacters.length);
                for (var i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                var blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                var url = URL.createObjectURL(blob);
                downloadFile(url, filename);
            } else {
                setApiResponse(response.data);
            }
            setLoadingGetFile(false);
        }).catch((error) => {
            if (error.response.data){
                setApiResponse(error.response.data);
            } else {
                alert(error);
            }
            setLoadingGetFile(false);
        })
    }

    return (
        <div className="demoForm">
            <h2>Demo</h2>
            <form onSubmit={(e) => handleSubmitFile(e)}>
                <input type="hidden" name="N" value="0" />
                <div className="centering">
                    <div className="fileInputContainer">
                        <input
                            name="file"
                            type="file"
                            onChange={((e) => setSelectedFile(e.target.files[0]))}
                        />
                        {selectedFile ?
                            <p className="fileInputText">
                                {selectedFile.name}
                            </p>
                            :
                            <p className="fileInputText">
                                Drag file or click here.
                            </p>
                        }
                    </div>
                </div>
                {loadingSave?
                    <Loader/>
                    :
                    <div>
                        <button style={{ marginTop:'10px', marginBottom: '0px' }} type="submit" className="button1">Click here to save file!</button>
                    </div>
                }
            </form>
            <br />
            {filename &&
                <>
                    <p>Your saved file:</p>
                    <b>{filename}</b>
                </>
            }
            <form onSubmit={(e) => handleGetFile(e)} style={{marginTop:'20px'}}>
                <div style={{ width: "25%", margin:'auto' }}>
                    <label for="filename">Paste your saved file filename here:</label>
                    <input type="text" id="filename" name="filename" onChange={((e) => setFilenameInput(e.target.value))} placeholder="filename"/>
                </div>
                <div>
                    <label for="t">Type:</label>
                    <div className="selectWrapper">
                        <select name="t" id="t" onChange={(e) => setType(e.target.value)} value={type}>
                            <option value="csv" selected>CSV</option>
                            <option value="json">Array of arrays</option>
                            <option value="html">HTML TABLE</option>
                            <option value="file">Download file</option>
                        </select>
                    </div>
                    {type == 'file' &&
                        <div style={{ width: "25%", margin: 'auto' }}>
                        <label for="name">Name to give file:</label>
                            <input name="name" type="text" onChange={((e) => setDownloadName(e.target.value))} placeholder="name" value={downloadName} />
                        </div>
                    }
                </div>
                <p>request url:</p>
                <p style={{ overflowWrap: 'break-word', wordWrap: 'break-word', width: '90%', margin: 'auto' }}>
                    /api/file?filename=
                    {filenameInput&&
                        <>
                            {encodeURIComponent(filenameInput)}
                        </>
                    }
                    {type != 'csv' &&
                        <>
                            &t={type}
                        </>
                    }
                    {downloadName &&
                        <>
                            &name={encodeURIComponent(downloadName)}
                        </>
                    }
                </p>
                {loadingGetFile?
                    <Loader />
                    :
                    <button style={{ marginBottom: '20px' }} className="button1" type="submit">Read file</button>
                }
            </form>
        </div>
    );
}

export default (SaveForm);
