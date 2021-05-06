import React, { useState } from 'react';
import ResponseDisplay from '../ResponseDisplay/ResponseDisplay';
import UploadForm from './UploadForm/UploadForm';
const Upload = () => {
    const [type, setType]   = useState('csv');
    const [selectedFile, setSelectedFile] = useState();
    const [apiResponse, setApiResponse] = useState();
    
    return (
        <div>
            <div className="descriptionContainer">
                <h2>/api/upload</h2>
                <p style={{ color: '#6d6d6d' }}>
                    Upload a file to /api/upload to convert the spreadsheet to a simpler format
                </p>
                <b>Parameters:</b>
                <ul style={{ textAlign: 'left' }}>
                    <li>
                        t=&lt;type&gt; export type: default is csv, "json" for json, "html" for html, "file" is to download the file
                    </li>
                    <li>
                        addr=&lt;cell address&gt; the address of the cell that you want to change the value of
                    </li>
                    <li>
                        val=&lt;value&gt; the value you want in that cell
                    </li>
                    <li>
                        name=&lt;name for file&gt; the name you want to give to a file for downloading
                    </li>
                </ul>
                <br />
            </div>
            <UploadForm
                setApiResponse={setApiResponse}
                setType={setType}
                type={type}
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}

            />
            <ResponseDisplay 
                apiResponse={apiResponse} 
                type={type} 
                endpoint='/api/upload'
            />
        </div>
    );
}

export default (Upload);
