import React, { useEffect, useState } from 'react';
import ProofOfDeliveryForm from './ProofOfDeliveryForm';
import './ProofOfDeliveryForm'
import ProofOfDeliveryDemo from './ProofOfDeliveryDemo';

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        console.log("window.api:", window.api);
        if (window.api) {
            // if (window.api.addNote())
            //     window.api.addNote().then(() => "Note added")
            if (window.api.getNotes())
                window.api.getNotes().then(setNotes);

        } else {
            console.error("window.api or window.api.getNotes is undefined");
        }

    }, []);

    return (
        <div>
            {/* <h1>My Notes must be here</h1>
            {notes.map((n) => (
                <p key={n.id}>{n.content}</p>
            ))} */}
            <ProofOfDeliveryDemo />
        </div>
    );
}

export default App;
