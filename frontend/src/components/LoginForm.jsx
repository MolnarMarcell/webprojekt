import { useState } from 'react'
import api from '../api/axiosInstance'
import '../css/AuthForm.css'

export default function LoginForm() {
    const [formdata, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setMessage(null)

        try {
            const response = await api.post('/users/login', formdata)
            console.log('Login successful:', response.data)
            setMessage('Sikeres bejelentkezés')
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message)
            setError('Sikertelen bejelentkezés')
        }
    }

    return (
        <section className="auth-card login-form">
            <h2>Bejelentkezés</h2>
            <p className="auth-description">Lépj be, és folytasd ott, ahol abbahagytad.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="login-email">Email:</label>
                    <input
                        type="email"
                        id="login-email"
                        placeholder="Email.."
                        name="email"
                        value={formdata.email}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Jelszó:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={formdata.password}
                        required
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Bejelentkezés</button>
                {error && <p className="error" role="alert">{error}</p>}
                {message && <p className="message" role="status">{message}</p>}
            </form>
        </section>
    )
}
