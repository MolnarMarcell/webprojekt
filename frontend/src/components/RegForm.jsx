import { useState } from "react";
import api from "../api/axiosInstance";
import "../App.css";

const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
};

export default function RegForm() {
    const [formdata, setFormData] = useState(initialForm);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (formdata.password !== formdata.confirmPassword) {
            setError("A jelszavak nem egyeznek.");
            return;
        }

        const registrationData = {
            name: formdata.name,
            email: formdata.email,
            password: formdata.password,
            phone: formdata.phone,
        };

        try {
            const response = await api.post("/users", registrationData);
            console.log("Registration successful:", response.data);
            setMessage("Sikeres regisztráció");
            setFormData(initialForm);
        } catch (error) {
            console.error("Registration failed:", error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || "Sikertelen regisztráció");
        }
    };

    return (
        <section className="auth-card register-form">
            <h2>Regisztráció</h2>
            <p className="auth-description">Hozd létre a fiókodat néhány egyszerű lépésben.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="register-name">Név:</label>
                    <input
                        type="text"
                        id="register-name"
                        placeholder="Teljes név"
                        name="name"
                        value={formdata.name}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-email">Email:</label>
                    <input
                        type="email"
                        id="register-email"
                        placeholder="Email.."
                        name="email"
                        value={formdata.email}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-phone">Telefonszám:</label>
                    <input type="tel" id="register-phone" name="phone" value={formdata.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Jelszó:</label>
                    <input
                        type="password"
                        id="register-password"
                        name="password"
                        value={formdata.password}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="register-confirm-password">Jelszó megerősítése:</label>
                    <input
                        type="password"
                        id="register-confirm-password"
                        name="confirmPassword"
                        value={formdata.confirmPassword}
                        required
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Regisztrálok</button>
                {error && (
                    <p className="error" role="alert">
                        {error}
                    </p>
                )}
                {message && (
                    <p className="message" role="status">
                        {message}
                    </p>
                )}
            </form>
        </section>
    );
}
