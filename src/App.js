import React, { useEffect, useState } from 'react';

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        console.log("window.api:", window.api);
        window.api.getNotes().then(setNotes);
    }, []);

    return (
        <div>
            <h1>My Notes</h1>
            {notes.map((n) => (
                <p key={n.id}>{n.content}</p>
            ))}
        </div>
    );
}

export default App;
