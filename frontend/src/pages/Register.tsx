import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/pathfinder-logo.png'
import './Register.css'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
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
            <div className="register-password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className="register-input"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="register-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {showPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
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
