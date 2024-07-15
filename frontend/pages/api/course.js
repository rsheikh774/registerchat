import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const response = await axios.post(
        'http://localhost:3000/courses/course-selection',
        req.body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
