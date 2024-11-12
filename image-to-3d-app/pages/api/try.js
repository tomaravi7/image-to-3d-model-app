// import fs from 'fs';
import path from 'path';

const modelsDir = path.join(process.cwd(), 'public', 'models');
const files = fs.readdirSync(modelsDir).filter((file) => file.endsWith('.glb'));
print(files);