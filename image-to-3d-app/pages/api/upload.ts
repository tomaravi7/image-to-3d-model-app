import { NextApiRequest, NextApiResponse } from 'next'
import formidable, { Files, Fields } from 'formidable'
import { createReadStream } from 'fs'
import fetch from 'node-fetch'
import FormData from 'form-data'

export const config = {
  api: {
    bodyParser: false,
  },
}

interface TripoApiResponse {
  message?: string;
  [key: string]: unknown;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | TripoApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const form = formidable({})
    const [fields, files]: [Fields, Files] = await form.parse(req)
    const file = files.file?.[0]

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const formData = new FormData()
    formData.append('file', createReadStream(file.filepath), {
      filename: file.originalFilename || 'unnamed-file',
      contentType: file.mimetype || 'application/octet-stream',
    })

    const response = await fetch('https://api.tripo3d.ai/v2/openapi/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TRIPO3D_API_KEY || ''}`,
        ...formData.getHeaders(),
      },
      body: formData,
    })

    const data = await response.json() as TripoApiResponse

    if (!response.ok) {
      throw new Error(data.message || 'Upload failed')
    }

    res.status(200).json(data)
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Internal server error' 
    })
  }
}