import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

const WebsocketComment = ({ data }) => {
    const navigate = useNavigate();

    return (
        <div>
            {
                data ?
                <div className='alert'>
                    New comment <Link onClick={() => {navigate(0)}} >Refresh</Link>
                </div>
                :
                null
            }
        </div>
    );
};

export default WebsocketComment;