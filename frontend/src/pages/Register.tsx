import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/pathfinder-logo.png'
import './Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    // TODO: replace with real registration call
    navigate('/dashboard')
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <Link to="/" className="register-logo-link">
          <img src={logo} alt="PathFinder" className="register-logo" />
        </Link>
        <h1 className="register-title">Create your account</h1>
        <p className="register-sub">Save your results and track your progress</p>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="register-field">
            <label htmlFor="name" className="register-label">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className="register-input"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="register-field">
            <label htmlFor="email" className="register-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="register-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="register-field">
            <label htmlFor="password" className="register-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="register-input"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="register-field">
            <label htmlFor="confirm" className="register-label">Confirm password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              className="register-input"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={handleChange}
            />
          </div>

          {error && <p className="register-error">{error}</p>}

          <button type="submit" className="register-btn">Create account</button>
        </form>

        <p className="register-footer">
          Already have an account?{' '}
          <Link to="/login" className="register-link">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
