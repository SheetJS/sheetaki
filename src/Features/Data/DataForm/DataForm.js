import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const downloadFile = require('../../../downloadFile');

const DataForm = ({type, setType, setApiResponse}) => {
    const [addr, setAddr] = useState('');
    const [val, setVal] = useState('');
    const [N, setN] = useState('');
    const [url, setUrl] = useState('');
    const [downloadName, setDownloadName] = useState('');
    const [loading, setLoading] = useState(false);


    //send request to /api/data
    const handleSubmit = () => {
        setLoading(true);
        event.preventDefault();
        axios({
            method: 'GET',
            url: `/api/data?url=${url}&N=${N}&t=${type}&name=${downloadName}&addr=${addr}&val=${val}`,
            responseType: 'text',
            headers: { 'Content-Type': 'application/octet-stream' }
        }).then((response) => {
            if(type=='file'){
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
            if(error.response.data){
                setApiResponse(error.response.data);
            } else {
                alert(error);
            }
            setLoading(false);
        })
    }
    return (
        <div className="demoForm">
            <h2>Demo</h2>
            <p>
                Sample single worksheet url:
                <div>
                    <button className="button2" onClick={(() => setUrl('https://obamawhitehouse.archives.gov/sites/default/files/omb/budget/fy2014/assets/receipts.xls'))}>select</button>
                    <a href="https://obamawhitehouse.archives.gov/sites/default/files/omb/budget/fy2014/assets/receipts.xls">https://obamawhitehouse.archives.gov/sites/default/files/omb/budget/fy2014/assets/receipts.xls</a>
                </div>
            </p>
            <p>
                Sample workbook url:
                <div>
                    <button className="button2" onClick={(() => setUrl('https://www.ers.usda.gov/webdocs/DataFiles/50048/Feed%20Grains%20Yearbook%20Tables-All%20Years.xls?v=42839'))}>select</button>
                    <a href="https://www.ers.usda.gov/webdocs/DataFiles/50048/Feed%20Grains%20Yearbook%20Tables-All%20Years.xls?v=42839">https://www.ers.usda.gov/webdocs/DataFiles/50048/Feed%20Grains%20Yearbook%20Tables-All%20Years.xls</a>
                </div>
            </p>
            <form onSubmit={(e) => handleSubmit(e)}>
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
                    <div style={{ width: "25%", margin:'auto' }}>
                    <label for="name">Name to give file:</label>
                        <input name="name" type="text" onChange={((e) => setDownloadName(e.target.value))} placeholder="name" value={downloadName} />
                    </div>
                }
                <div style={{ display: "flex", margin:'auto', width: '100%'}}>
                    <div style={{width: "25%"}}>
                        <label for="url">url:</label>
                        <input name="url" type="text" onChange={((e) => setUrl(e.target.value))} placeholder="url" value={url}/>
                    </div>
                    <div style={{ width: "25%" }}>
                        <label for="N">Worksheet:</label>
                        <input name="N" type="text" onChange={((e) => setN(e.target.value))} placeholder="N" />
                    </div>
                    <div style={{ width: "25%" }}>
                        <label for="addr">Cell address:</label>
                        <input name="addr" type="text" onChange={((e) => setAddr(e.target.value))} placeholder="addr"/>
                    </div>
                    <div style={{ width: "25%" }}>
                        <label for="val">New value:</label>
                        <input name="val" type="text" onChange={((e) => setVal(encodeURIComponent(e.target.value)))} placeholder="val"/>
                    </div>
                </div>
                <p>request url:</p>
                <div className="urlWrapper">
                    <p style={{overflowWrap: 'break-word', wordWrap:'break-word', width:'90%', margin:'auto'}}>
                        /api/data?url=
                        {url &&
                            <>
                                {url}
                            </>
                        }
                        {N &&
                            <>
                                &N={N}
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
                        {addr &&
                            <>
                                &addr={addr}
                            </>
                        }
                        {val &&
                            <>
                                &val={val}
                            </>
                        }
                    </p>
                </div>
                {loading?
                    <Loader/>
                    :
                    <button className="button1">Send Request</button>
                }
            </form>
        </div>
    );
}

export default (DataForm);
