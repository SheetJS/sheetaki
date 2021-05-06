import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const downloadFile = require('../../../downloadFile');

const UploadForm = ({ type, setType, setApiResponse, selectedFile, setSelectedFile }) => {
    const [addr, setAddr] = useState('');
    const [val, setVal] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloadName, setDownloadName] = useState('');


    //post file to /api/upload
    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        let formData = new FormData();
        formData.append("file", selectedFile);
        let url = `/api/upload?t=${type}&addr=${addr}&val=${val}&name=${downloadName}`;
        axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
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
            }else{
                setApiResponse(response.data);
            }
            setLoading(false);
        }).catch((error) => {
            if (error.response.data){
                setApiResponse(error.response.data);
            }else{
                alert(error);
            }
            setLoading(false);
        });
    }

    return (
        <div className="demoForm">
            <h2>Demo</h2>
            <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
                <input type="hidden" value="0" />
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
                <label for="t">Export Type:</label>
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
                <div style={{ display: "flex", margin: 'auto', width: '80%' }}>
                    <div style={{ width: "50%" }}>
                        <label for="addr">Cell address to change:</label>
                        <input name="addr" type="text" onChange={((e) => setAddr(e.target.value))} placeholder="addr" />
                    </div>
                    <div style={{ width: "50%" }}>
                        <label for="val">New value:</label>
                        <input name="val" type="text" onChange={((e) => setVal(encodeURIComponent(e.target.value)))} placeholder="val" />
                    </div>
                </div>
                <p>request url:</p>
                <p style={{ overflowWrap: 'break-word', wordWrap: 'break-word', width: '90%', margin: 'auto' }}>
                    /api/upload
                    {type != 'csv' &&
                        <>
                            ?t={type}
                        </>
                    }
                    {downloadName &&
                        <>
                            &name={encodeURIComponent(downloadName)}
                        </>
                    }
                </p>
                {loading ?
                    <Loader />
                    :
                    <button style={{ marginBottom: '20px' }} className="button1">Click here to upload!</button>
                }            
            </form>
        </div>
    );
}

export default (UploadForm);
