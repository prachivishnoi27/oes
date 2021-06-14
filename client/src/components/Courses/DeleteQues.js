import React from 'react';
import { useParams } from 'react-router';

const DeleteQues = () => {
    const { code, quesid } = useParams();
    return (
        <div>
            Delete Ques
            code: {code}
            quesid: {quesid}
        </div>
    )
}

export default DeleteQues;