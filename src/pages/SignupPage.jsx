
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../store/actions/user.actions.js'
import airbnb from '../assets/icons/airbnb.svg'

export function SignupPage() {
    const [credentials, setCredentials] = useState({ fullname: '', username: '', password: '', imgUrl: '' })
    // const [credentials, setCredentials] = useState({ fullname: '', username: '', password: '' })
    const navigate = useNavigate()
    const dispatch = useDispatch()
async function handleImgUpload(ev) {
    const file = ev.target.files[0]
    if (!file) return
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'my_staybob')
    
    const res = await fetch('https://api.cloudinary.com/v1_1/kbwymfbq/image/upload', {
        method: 'POST',
        body: formData
    })
    const data = await res.json()
    setCredentials(prev => ({ ...prev, imgUrl: data.secure_url }))
}
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

            <div className="signup-card">

                <div className="signup-header">
                    <img className="logo" src={airbnb} alt="logo" />
                    <h1>Create Your Account</h1>
                    <p>It's free and always will be.</p>
                </div>

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
                    <div className="img-upload">
    {credentials.imgUrl && <img src={credentials.imgUrl} alt="profile" />}
    <label htmlFor="img-upload">Upload profile picture</label>
    <input id="img-upload" type="file" accept="image/*" onChange={handleImgUpload} hidden />
</div>
                    <button className="signup-btn">Sign Up</button>
                </form>
                <p className="login-p">Already have an account? <span className="login-link" onClick={() => navigate('/login')}>Log in</span></p>
            </div>


        </section>
    )
}