import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
// if (response.ok) {
//   const { token, isRegisteredForCourse } = await response.json();
//   localStorage.setItem('token', token);
//   if (isRegisteredForCourse) {
//     router.push('/chat-room');
//   } else {
//     router.push('/course-selection');
//   }
// } else {
//   const errorData = await response.json();
//   console.error('Login failed', errorData);
// }