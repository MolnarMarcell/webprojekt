import LoginForm from "./components/LoginForm";
import RegForm from "./components/RegForm";
import UserForm from "./components/UserForm";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import MultiForm from "./components/MultiForm";
import TestForm from "./components/TestForm";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegForm />} />
                    <Route path="/user" element={<UserForm />} />
                    <Route path="/multiform" element={<MultiForm />} />
                    <Route path="/test" element={<TestForm />} />
                </Routes>
            </Router>

            <Footer />
        </>
    );
}

export default App;
