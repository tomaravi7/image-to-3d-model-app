// pages/api/fetch-task.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { taskID } = req.body;

  if (!taskID) {
    return res.status(400).json({ message: 'Task ID is required' });
  }

  try {
    const url = `https://api.tripo3d.ai/v2/openapi/task/${taskID}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TRIPO3D_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error(`Failed to fetch task. ${errorResponse}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
