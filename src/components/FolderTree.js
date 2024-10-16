import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';

const FolderTree = ({ onFolderClick }) => {
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);

    // Fetch folder data from the API
    useEffect(() => {
        axios.get('http://localhost:8000/api/folders')
            .then(response => {
                setFolders(response.data.data);
            })
            .catch(error => {
                console.error("There was an error fetching the folders!", error);
            });
    }, []);

    // Recursive function to render folder structure with proper indentation
    const renderFolderTree = (folder, level = 0) => {
        return (
            <div key={folder.id}>
                <div 
                    style={{ paddingLeft: `${level * 20}px`, cursor: 'pointer' }} 
                    onClick={() => handleFolderClick(folder.id)}
                >
                    <FontAwesomeIcon icon={faFolder} style={{ marginRight: '10px' }} />
                    {folder.name}
                </div>
                {folder.subfolders && folder.subfolders.length > 0 && (
                    <div>
                        {folder.subfolders.map(subfolder => renderFolderTree(subfolder, level + 1))}
                    </div>
                )}
                {folder.files && folder.files.length > 0 && (
                    <div>
                        {folder.files.map(file => renderFile(file, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const renderFile = (file, level = 0) => {
        return (
            <div key={file.id} style={{ paddingLeft: `${level * 20}px`, display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faFile} style={{ marginRight: '10px' }} />
                {file.name}
            </div>
        );
    };

    // Handle folder click to display subfolders in the right panel
    // const handleFolderClick = (folder) => {
    //     setSelectedFolder(folder.subfolders || []);
    // };
    const handleFolderClick = (folderId) => {
        onFolderClick(folderId);
    };

    return (
        <div className='folder-tree'>
            <div>
                <h2>Folder Structure</h2>
                {folders.map(folder => renderFolderTree(folder))}
            </div>
        </div>
    );
};

export default FolderTree;
