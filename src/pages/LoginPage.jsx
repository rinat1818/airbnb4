import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service.js'

export function LoginPage({ onSetUser }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials({ ...credentials, [name]: value })
    }

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            const user = await userService.login(credentials.username, credentials.password)
            onSetUser(user)
            navigate('/')
        } catch (err) {
            alert('Login failed: ' + err)
        }
    }

    return (
        <section className="login-page">
            <h2>Login</h2>
            <form onSubmit={onLogin}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button>Login</button>
            </form>
        </section>
    )
}