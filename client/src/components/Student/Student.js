import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudentHeader from '../Headers/StudentHeader';

const Student = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:5000/student/me',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setProfile(response.data)
            } catch (e) {
                console.log('error in catch');
            }
        })();
    }, [])

    return (
        <div>
            <StudentHeader />
            <div>Student</div>
            <div>{profile === {}? '': profile.rollno}</div>
        </div>
    )
}

export default Student;