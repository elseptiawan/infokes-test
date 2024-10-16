import React, { useState } from 'react';
import FolderTree from './components/FolderTree';
import Subfolders from './components/Subfolders';
import './App.css';

const App = () => {
    const [selectedFolder, setSelectedFolder] = useState(null);

    const handleFolderClick = (folderId) => {
        setSelectedFolder(folderId);
    };

    return (
        <div className="app">
            <div className="left-panel">
                <FolderTree onFolderClick={handleFolderClick} />
            </div>
            <div className="right-panel">
                {selectedFolder ? (
                    <Subfolders folderId={selectedFolder} />
                ) : (
                    <div>Select a folder to view subfolders</div>
                )}
            </div>
        </div>
    );
};

export default App;
