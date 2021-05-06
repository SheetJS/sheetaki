import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../../Loader/Loader';

const ReadWorkbookForm = ({ setApiResponse }) => {
    const [N, setN] = useState('');
    const [url, setUrl] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        event.preventDefault();
        axios({
            method: 'GET',
            url: `/api/data?url=https://www.ers.usda.gov/webdocs/DataFiles/50048/Feed%20Grains%20Yearbook%20Tables-All%20Years.xls?v=42839&N=${N}`
        }).then((response) => {
            setApiResponse(response.data);
            setLoading(false);
        }).catch((error) => {
            setApiResponse(error.response.data);
            // alert(error);
            setLoading(false);
        })
    }

    return (
        <div className="demoForm">
            <h2>Demo</h2>
            <p>
                Sample url to use:
                <div>
                    <a href="https://www.ers.usda.gov/webdocs/DataFiles/50048/Feed%20Grains%20Yearbook%20Tables-All%20Years.xls?v=42839">https://obamawhitehouse.archives.gov/sites/default/files/omb/budget/fy2014/assets/receipts.xls</a>
                </div>
            </p>
            <form onSubmit={(e) => handleSubmit(e)}>
            
                <div style={{ display: "flex", margin: 'auto', width: '100%' }}>
                    <div style={{ width: "33.3333%" }}>
                        <label for="N">N:</label>
                        <input name="N" type="text" onChange={((e) => setN(e.target.value))} placeholder="N" />
                    </div>
                </div>
                <p>request url:</p>
                <p>
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
                </p>
                {loading ?
                    <Loader />
                    :
                    <button style={{ marginBottom: '20px' }} className="button1">Send Request</button>
                }
            </form>
        </div>
    );
}

export default (ReadWorkbookForm);
