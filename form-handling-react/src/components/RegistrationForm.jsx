import React, { useState } from 'react';

function RegistrationForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.username.trim()) err.username = 'Username is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) err.email = 'Email is invalid';
    if (!form.password) err.password = 'Password is required';
    else if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      // simulate API
      setSubmitted({ ...form });
      setForm({ username: '', email: '', password: '' });
    } else {
      setSubmitted(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 8 }}>
          <label>
            Username
            <input name="username" value={form.username} onChange={handleChange} style={{ marginLeft: 8 }} />
          </label>
          {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Email
            <input name="email" value={form.email} onChange={handleChange} style={{ marginLeft: 8 }} />
          </label>
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={handleChange} style={{ marginLeft: 8 }} />
          </label>
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>

        <button type="submit">Register</button>
      </form>

      {submitted && (
        <div style={{ marginTop: 12, padding: 8, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
          <strong>Submitted (simulated):</strong>
          <div>Username: {submitted.username}</div>
          <div>Email: {submitted.email}</div>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
