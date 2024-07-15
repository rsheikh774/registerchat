// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, isRegisteredForCourse } = await response.json();
        localStorage.setItem('token', token);
        if (isRegisteredForCourse) {
          router.push('/chat-room');
        } else {
          router.push('/course-selection');
        }
      } else {
        const errorData = await response.json();
        console.error('Login failed', errorData);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <form className={styles['form-container']} onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
