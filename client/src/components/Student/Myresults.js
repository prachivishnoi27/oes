import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudentHeader from '../Headers/StudentHeader';

const Myresults = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:5000/myresults',
                    headers: { Authorization: `Bearer ${token}`}
                })
                console.log(response);
                setResults(response.data)
            } catch (e) {
                console.log("error getting results");
            }
        })();
    }, []);

    return (
        <div className="student">
            <div className="ui container">
                <StudentHeader />
            {results.length}
            </div>
        </div>
    );
}

export default Myresults;