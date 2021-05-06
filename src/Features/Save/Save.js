import React, { useState } from 'react';
import SaveForm from './SaveForm/SaveForm';
import ResponseDisplay from '../ResponseDisplay/ResponseDisplay';

const Save = () => {
    const [type, setType] = useState('csv');
    const [apiResponse, setApiResponse] = useState();

    return (
        <div>
            <div className="descriptionContainer">
                <h2>
                    /api/save
                </h2>
                <div style={{ color: '#6d6d6d' }}>
                    <p>
                        Use /api/save to save a file to an AWS S3 Bucket
                    </p>
                </div>
                <h2>
                    /api/file
                </h2>
                <div style={{ color: '#6d6d6d' }}>
                    <p>
                        Then use /api/file?filename= 
                        to read the saved file. Choose t=file to download the file.
                    </p>
                </div>
                <b>Parameters:</b>
                <ul style={{ textAlign: 'left' }}>
                    <li>
                        t=&lt;type&gt; export type: default is csv, "json" for json, "html" for html, "file" is to download the file
                    </li>
                    <li>
                        name=&lt;name for file&gt; the name you want to give to a file for downloading
                    </li>
                </ul>
            </div>
            <SaveForm type={type} setType={setType} setApiResponse={setApiResponse}/>
            <ResponseDisplay 
                apiResponse={apiResponse} 
                type={type} 
                endpoint='/api/file'
            />
        </div>
    );
}

export default (Save);
