import React, { useState, useEffect } from 'react';
import './App.css'

const Study = () => {
    const [todo, setTodo] = useState([]);
    const [time, setTime] = useState(0);
    const [timerStatus, setTimerStatus] = useState('');
    const [timeInput, setTimeInput] = useState('');

    useEffect(() => {
        let interval;
        if (timerStatus === 'running') {
            interval = setInterval(() => {
                setTime(time => time - 1);
            }, 1000);
        } else if (timerStatus === 'stopped') {
            clearInterval(interval);
            setTime(0);
        }
        return () => clearInterval(interval); // Cleanup function to clear interval on unmount or when timerStatus changes
    }, [timerStatus]);
    
    const startTimer = () => {
        if (timerStatus !== 'running') {
            setTimerStatus('running');
        }
    };
    
    const pauseTimer = () => {
        if (timerStatus === 'running') {
            setTimerStatus('paused');
        }
        // No need to clear interval here
    };
    
    const stopTimer = () => {
        setTimerStatus('stopped');
    };
    
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600)
        const minutes = Math.floor(time / 60 % 60)
        const seconds = time % 60
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    useEffect(() => {
        showItems();
    }, []);

    const getItems = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/items", requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    const addItem = async () => {
        const newItem = document.getElementById("new_item").value

        const raw = JSON.stringify({
            "name": newItem
        });
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: raw,
            redirect: "follow"
        };

        fetch("http://127.0.0.1:8000/items/add", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        // clear input fields
        document.getElementById("new_item").value = "";
        showItems();
    }
    const deleteItem = async (item) => {
        const raw = JSON.stringify({ "name": item });
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: "follow"
        };
    
        await fetch("http://127.0.0.1:8000/items/remove", requestOptions);
        showItems();
    }
    
    const showItems = async () => {
        const items = await getItems();
        console.log(items) // Output: ['item1', 'item2', ...]
        setTodo(items);
    }
    const handleTimeInput = () => {
        setTime(parseInt(timeInput)*60)
        document.getElementById("settime").value = '';
    }
    return (
        <div>
            <h1 className = "website-headers">Study Hub</h1>
            <div className = "timer">
                <div id="time-input">
                <h4>Time Left: </h4>
                <p>{formatTime(time)}</p>
                <input
                    id="settime"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                    placeholder="Enter minutes, Set Time"
                />
                </div>
                <div id="buttons">
                <button onClick={handleTimeInput}>Set Time</button>
                <button onClick={startTimer}>Start</button>
                <button onClick={pauseTimer}>Pause</button>
                <button onClick={stopTimer}>Stop</button>
                </div>
            </div>
            <div>
                <ul id="todo_list">
                    {todo.length === 0 ? "No items added yet." : todo.map((item, index) => {
                        return (
                            <li key={index}>
                                {item}
                                <button onClick={() => deleteItem(item)}>Delete</button>
                            </li>
                        )
                    })}
                </ul>
                <div id="add-ons">
                <input id="new_item"></input>
                <button onClick={() => addItem()}>Add Item</button>
                </div>
            </div>
        </div>
    )
}

export default Study;