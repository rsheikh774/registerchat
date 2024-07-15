import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import styles from './chat.module.css'; // Assuming you have a CSS module for styling

const socket = io('http://localhost:3000'); // Replace with your NestJS server URL

export default function ChatRoom() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username') || '');
    setCourseName(localStorage.getItem('courseName') || '');

    if (courseName) {
      socket.emit('joinRoom', { courseId: courseName });

      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('message');
        socket.emit('leaveRoom', { courseId: courseName });
      };
    }
  }, [courseName]);

  const sendMessage = () => {
    if (message && username && courseName) {
      socket.emit('message', { username, message, courseId: courseName });
      setMessage('');
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedCourseName = localStorage.getItem('courseName');
    if (!savedUsername || !savedCourseName) {
      router.push('/course-selection');
    }
  }, [router]);

  return (
    <div className={styles['chat-container']}>
      <h1>Chat for {courseName}</h1>
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles['message-input']}
      />
      <button onClick={sendMessage} className={styles['send-button']}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={styles['chat-message']}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
}
