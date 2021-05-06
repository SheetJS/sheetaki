import React, {useEffect} from 'react';

//renders a response from an api request
const ResponseDisplay = ({ apiResponse, type, endpoint }) => {
    useEffect(() => {
        //render the table html
        if(type=='html'){
            var tag_id = document.getElementById('apiResponse');
            tag_id.innerHTML = apiResponse;
        }
    }, [apiResponse])
    return (
        <>
            {apiResponse &&
                <div style={{ borderTop: 'solid #77E2B6 5px' }}>
                    <h2 >
                        Response from {endpoint}:
                    </h2>
                    <div className="scrollableDiv" id="apiResponse">
                        {type == 'json' &&
                            JSON.stringify(apiResponse)
                        }
                        {type == 'csv' &&
                            apiResponse
                        }
                        {type == 'file' &&
                            apiResponse
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default (ResponseDisplay);
