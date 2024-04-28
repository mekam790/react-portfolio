import React, { useState, useEffect } from 'react';
import './App.css'

const Study = () => {
    // set todo list array
    const [todo, setTodo] = useState([]);
    // set time array that accepts minutes
    const [time, setTime] = useState(0);
    // set timer status
    const [timerStatus, setTimerStatus] = useState('');
    // set time input
    const [timeInput, setTimeInput] = useState('');
    // based on the time status, set the timer to count down every second if running and stop timer if stopped
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
        return () => clearInterval(interval);
    }, [timerStatus]);
    // start timer and set status
    const startTimer = () => {
        if (timerStatus !== 'running') {
            setTimerStatus('running');
        }
    };
    // pause timer and set status
    const pauseTimer = () => {
        if (timerStatus === 'running') {
            setTimerStatus('paused');
        }
    };
    // stop timer and set status
    const stopTimer = () => {
        setTimerStatus('stopped');
    };
    // format time based on seconds
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600)
        const minutes = Math.floor(time / 60 % 60)
        const seconds = time % 60
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
    // list functions

    // on the first render, show the list
    useEffect(() => {
        showItems();
    }, []);

    // get items from list
    const getItems = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        // try to get items from api call
        try {
            const response = await fetch("http://127.0.0.1:8000/items", requestOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    // add item to list
    const addItem = async () => {
        // get new item value from input
        const newItem = document.getElementById("new_item").value

        // store as object for api to accept
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
        try {
            await fetch("http://127.0.0.1:8000/items/add", requestOptions)
            showItems();
            document.getElementById("new_item").value = "";
        } catch (error) {
            console.error(error);
        }
    }
    // remove item from list
    const deleteItem = async (item) => {
        // accept item as json object
        const raw = JSON.stringify({ "name": item });
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: raw,
            redirect: "follow"
        };
        try {
            await fetch("http://127.0.0.1:8000/items/remove", requestOptions);
            showItems();
        } catch (error) {
            console.error(error);
        }
    }
    
    const showItems = async () => {
        // get items and set them to list
        const items = await getItems();
        console.log(items) // Output: ['item1', 'item2', ...]
        setTodo(items);
    }
    const handleTimeInput = () => {
        // convert minutes to seconds
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