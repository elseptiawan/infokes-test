import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';

const Subfolders = ({ folderId }) => {
    const [subfolders, setSubfolders] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (folderId) {
            axios.get(`http://localhost:8000/api/folders/${folderId}`)
                .then(response => {
                    setSubfolders(response.data.data.subfolders);
                    setFiles(response.data.data.files);
                });
        }
    }, [folderId]);

    return (
        <div className="subfolder-list">
            <h2>Subfolders</h2>
            <ul>
                {subfolders.map(subfolder => (
                    <li key={subfolder.id}>
                        <FontAwesomeIcon icon={faFolder} style={{ marginRight: '10px' }} />
                        {subfolder.name}
                    </li>
                ))}
                {files.map(file => (
                    <li key={file.id}>
                        <FontAwesomeIcon icon={faFile} style={{ marginRight: '10px' }} />
                        {file.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Subfolders;
