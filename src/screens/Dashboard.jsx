import Split from "react-split"
import Sidebar from "../components/Sidebar"
import Editor from "../components/Editor"

export default function Dashboard() {
    return(
        <Split
        direction="horizontal"
        sizes={[30, 70]}>
            <Sidebar />
            <Editor />
        </Split>
    )
}