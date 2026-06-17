// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { userService } from '../services/user.service.js'

// export function SignupPage({ onSetUser }) {
//     const [credentials, setCredentials] = useState({ fullname: '', username: '', password: '' })
//     const navigate = useNavigate()

//     function handleChange(ev) {
//         const { name, value } = ev.target
//         setCredentials({ ...credentials, [name]: value })
//     }

//     async function onSignup(ev) {
//         ev.preventDefault()
//         try {
//             const user = await userService.signup(credentials)
//             onSetUser(user)
//             navigate('/')
//         } catch (err) {
//             alert('Signup failed: ' + err)
//         }
//     }

//     return (
//         <section className="signup-page">
//             <h2>Sign Up</h2>
//             <form onSubmit={onSignup}>
//                 <input
//                     type="text"
//                     name="fullname"
//                     placeholder="Full name"
//                     value={credentials.fullname}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={credentials.username}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={credentials.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 <button>Sign Up</button>
//             </form>
//         </section>
//     )
// }

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/user.actions.js'

export function SignupPage() {
    const [credentials, setCredentials] = useState({ fullname: '', username: '', password: '' })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials({ ...credentials, [name]: value })
    }

    async function onSignup(ev) {
        ev.preventDefault()
        try {
            await dispatch(signup(credentials))
            navigate('/')
        } catch (err) {
            alert('Signup failed: ' + err)
        }
    }

    return (
        <section className="signup-page">
            <h2>Sign Up</h2>
            <form onSubmit={onSignup}>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full name"
                    value={credentials.fullname}
                    onChange={handleChange}
                    required
                />
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
                <button>Sign Up</button>
            </form>
        </section>
    )
}