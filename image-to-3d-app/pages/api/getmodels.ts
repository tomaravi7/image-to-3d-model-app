import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const modelsDir = path.join(process.cwd(), 'public', 'models');
  console.log('Accessing models directory:', modelsDir);

  try {
    const files = fs.readdirSync(modelsDir);
    console.log('Files found in models directory:', files);
    const glbFiles = files.filter((file) => file.endsWith('.glb'));
    console.log('Filtered .glb files:', glbFiles);
    res.status(200).json(glbFiles);
  } catch (error) {
    console.error('Error reading models directory:', error);
    res.status(500).json({ error: 'Unable to read models folder' });
  }
}
