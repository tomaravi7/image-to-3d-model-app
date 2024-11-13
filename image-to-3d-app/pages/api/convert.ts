// pages/api/convert.ts
import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const response = await fetch('https://api.tripo3d.ai/v2/openapi/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TRIPO3D_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    })

    const data: { message?: string } = await response.json() as { message?: string }

    if (!response.ok) {
      throw new Error(data.message || 'Conversion failed')
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('Conversion error:', error)
    res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' })
  }
}