import React, { useState } from 'react';
import ResponseDisplay from '../ResponseDisplay/ResponseDisplay';
import ReadWorkbookForm from './ReadWorkbookForm/ReadWorkbookForm';

const ReadWorkbook = ({ activeItem }) => {
    const [apiResponse, setApiResponse] = useState();

    return (
        <div>


            <div>
                <div style={{ width: '40%', margin: 'auto' }}>
                    <h2>Read Workbook</h2>
                    <p>
                        Send a request to /api/data to convert the spreadsheet at
                        `url` to a simpler format
                    </p>
                    <b>Parameters:</b>
                    <ol style={{ textAlign: 'left' }}>
                        <li>
                            N=&lt;idx&gt; the sheet index to use (-1 returns a list of sheet names in the workbook)
                        </li>
                    </ol>
                    <br />
                </div>
                {/* <hr style={{width:'40%'}}/> */}
                <ReadWorkbookForm
                    setApiResponse={setApiResponse}
                />
            </div>
            <ResponseDisplay apiResponse={apiResponse}/>
        </div>
    );
}

export default (ReadWorkbook);
