import { Route, Routes } from "react-router-dom";
import About from "../pages/About";

const Main = () => {
    return (
        <div>
            <div>Main Component</div>
            <Routes>
                <Route path="/" element = {<h1>Main Page</h1>} />
                {/* <Route path="/about" element = {<About  />} /> */}
                <Route path="/about" Component={About} />

            </Routes>
        </div>
    );
}

export default Main;