

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/actions/user.actions.js'

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
            navigate('/')
        } catch (err) {
         setError(true)
        }
    }
return (
    <section className="login-page">
       
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
            <button>Login</button>
        </form>
    </section>
)
    // return (
    //     <section className="login-page">
           
    //         <form onSubmit={onLogin}>
    //             <input
    //                 type="text"
    //                 name="username"
    //                 placeholder="Username"
    //                 value={credentials.username}
    //                 onChange={handleChange}
    //                 required
    //             />
    //             <input
    //                 type="password"
    //                 name="password"
    //                 placeholder="Password"
    //                 value={credentials.password}
    //                 onChange={handleChange}
    //                 required
    //             />
    //             <button>Login</button>
    //         </form>
    //     </section>
    // )
}