import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import "../style.css";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [tasksList, setTasksList] = useState([]);
    const [currentTaskId, setCurrentTaskId] = useState("0");
    const [currentTask, setCurrentTask] = useState({})

    // Want to fetch data once when we initialize the app
    useEffect(() => {
        // Make this run only on mount (currently unsure if this will run after a log-out)
        async function fetchData() {
            await fetch("/init", {
                method: "GET",
            })
                .then((response) => response.json())
                .then((json) => setTasksList(json));    
        }
        fetchData()


        
    }, []);

    return (
        <main>
            <Sidebar setCurrentTask={setCurrentTask} />
            <Editor setTasksList={setTasksList} tasksList={tasksList} currentTaskId={currentTaskId} currentTask={currentTask} />
        </main>
    );
}
