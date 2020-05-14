import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Segment, Button } from "semantic-ui-react";

function App() {
    const [ lastForce, forceUpdate ] = useState(null);
    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        console.warn(`.fetch(...) called`);
        fetch(`http://localhost:3001/tasks`)
            .then(res => res.json())
            .then(setTasks)
            .catch(console.log);
    }, [ lastForce ]);
    
    function testPostCall() {
        fetch("http://localhost:3001/task", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify({
                "id": Date.now(),
                "author": "Matt",
                "task": `This is a REACT test task at ${ Date.now() }`,
                "timestamp": Date.now(),
                "status": "INCOMPLETE",
                "tags": [],
                "children": []
            })
        })
            .then(() => forceUpdate(Date.now()));
    }

    if(Array.isArray(tasks) && tasks.length) {
        return (
            <Segment>
                <Button onClick={ testPostCall }>Add Random Task</Button>
                {
                    tasks.map(task => (
                        <div key={ task.id } style={{ borderBottom: "1px solid #000", marginBottom: 20 }}>
                            <div>{ task.author }</div>
                            <div>{ task.task }</div>
                            <div>{ task.timestamp }</div>
                        </div>
                    ))
                }
            </Segment>
        )
    }

	return (
		<div>Loading...</div>
	);
}

export default App;
