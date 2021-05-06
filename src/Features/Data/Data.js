import React, { useState } from 'react';
import ResponseDisplay from '../ResponseDisplay/ResponseDisplay';
import DataForm from './DataForm/DataForm';

const Proxy = () => {
    const [type, setType] = useState('csv');
    const [apiResponse, setApiResponse] = useState();
    
    return (
        <div>
            <div>
                <div className="descriptionContainer">
                    <h2>/api/data</h2>
                    <p style={{ color:'#6d6d6d'}}>
                        Send a request to /api/data to convert the spreadsheet at
                        `url` to a simpler format
                    </p>
                    <b>Parameters:</b>
                        <ul style={{textAlign:'left'}}>
                            <li>
                                url=&lt;url&gt; the url to request 
                            </li>
                            <li>
                                N=&lt;idx&gt; the sheet index to use (-1 returns a list of sheet names in the workbook) 
                            </li>
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
                    <br/>
                </div>
                <DataForm
                    type={type}
                    setType={setType}
                    setApiResponse={setApiResponse}
                />
            </div>
            <ResponseDisplay 
                apiResponse={apiResponse} 
                type={type} 
                endpoint='/api/data'
            />
        </div>
    );
}

export default (Proxy);