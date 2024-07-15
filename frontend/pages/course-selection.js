import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './course-selection.module.css';

export default function CourseSelection() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [courseName, setCourseName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    setName(payload.name || '');
    setEmail(payload.email || '');
    setPhone(payload.phone || '');
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, phone, courseName, collegeName, degree }),
      });

      if (response.ok) {
        alert('Course selected successfully');
        localStorage.setItem('username', name);
        localStorage.setItem('courseName', courseName);
        router.push('/chat-room');
      } else {
        console.error('Course selection failed');
      }
    } catch (error) {
      console.error('Error occurred while fetching:', error);
    }
  };

  return (
    <form className={styles['form-container']} onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Phone Number</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <label>Course Name</label>
        <select value={courseName} onChange={(e) => setCourseName(e.target.value)} required>
          <option value="">Select a course</option>
          <option value="Full Stack">Full Stack</option>
          <option value="DevOps">DevOps</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
        </select>
      </div>
      <div>
        <label>College Name</label>
        <input type="text" value={collegeName} onChange={(e) => setCollegeName(e.target.value)} required />
      </div>
      <div>
        <label>Degree</label>
        <input type="text" value={degree} onChange={(e) => setDegree(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
