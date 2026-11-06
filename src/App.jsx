import { BrowserRouter, Route, Routes } from "react-router";
import Search from "./pages/Search.jsx";
import Detail from "./pages/Detail.jsx";


function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Search />} />
            <Route path={"/search"} element={<Search />} />
            <Route path={`/detail/:imdbID`} element={<Detail />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;
