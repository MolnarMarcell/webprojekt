import { useState } from "react";
import "./UserForm.css";

export default function UserForm() {
    const initialForm = {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        role: "developer",
        newsletter: false,
    };

    const [formdata, setFormData] = useState(initialForm);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        setError(null);
        setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (!formdata.firstName.trim() || !formdata.lastName.trim() || !formdata.email.trim()) {
            setError("Töltsd ki az összes mezőt!");
            return;
        }

        if (formdata.age !== "" && (!Number.isFinite(Number(formdata.age)) || Number(formdata.age) <= 0)) {
            setError("Az életkor csak pozitív szám lehet!");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formdata,
                    age: formdata.age === "" ? null : Number(formdata.age),
                }),
            });

            if (!response.ok) {
                throw new Error(`A szerver ${response.status} hibakóddal válaszolt.`);
            }

            setMessage("Sikeres adatküldés!");
            setFormData(initialForm);
        } catch (error) {
            console.error("Hiba:", error);
            setError("Hiba történt az adatküldés során!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h1>Felhasználói adatlap</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">
                    Keresztnév *
                    <input
                        type="text"
                        id="firstname"
                        name="firstName"
                        value={formdata.firstName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor="lastname">
                    Vezetéknév *
                    <input
                        type="text"
                        id="lastname"
                        name="lastName"
                        value={formdata.lastName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor="email">
                    E-mail cím *
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formdata.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label htmlFor="age">
                    Életkor
                    <input
                        type="number"
                        id="age"
                        name="age"
                        min="1"
                        step="1"
                        value={formdata.age}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="role">
                    Szerepkör
                    <select name="role" id="role" value={formdata.role} onChange={handleChange}>
                        <option value="developer">Fejlesztő</option>
                        <option value="designer">Designer</option>
                        <option value="manager">Projektmenedzser</option>
                    </select>
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" name="newsletter" checked={formdata.newsletter} onChange={handleChange} />
                    Feliratkozás a hírlevélre
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "Küldés folyamatban..." : "Adatok beküldése"}
                </button>
                {error && (
                    <p className="error" role="alert">
                        {error}
                    </p>
                )}
                {message && (
                    <p className="success" role="status">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}
