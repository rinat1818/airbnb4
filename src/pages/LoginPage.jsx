import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/user.actions.js'
import airbnb from '../assets/icons/airbnb.svg'

export function LoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials({ ...credentials, [name]: value })
    }

    async function onLogin(ev) {
        ev.preventDefault()
        try {
            await dispatch(login(credentials))
            navigate('/user')
        } catch (err) {
            setError(true)
        }
    }
    return (
        <section className="login-page">

            <div className="login-card">

                <div className="login-header">
                    <img className="logo" src={airbnb} alt="logo" />
                    <h1>Welcome Back!</h1>
                    <p>Log in to your account</p>
                </div>

                <form onSubmit={onLogin}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={handleChange}
                        className={error ? 'input-error' : ''}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        className={error ? 'input-error' : ''}
                        required
                    />
                    {error && <p className="error-msg">Username or password is incorrect</p>}
                    <button className="login-btn">Login</button>
                </form>
                <p className="signup-p">Don't have an account? <span className="signup-link" onClick={() => navigate('/signup')}>Signup</span></p>
            </div>
        </section>
    )
}