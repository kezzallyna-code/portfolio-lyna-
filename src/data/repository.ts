import fs from 'fs';
import path from 'path';
import { PortfolioData } from './schema';

const dataDirectory = path.join(process.cwd(), 'src/data/json');

export async function getPortfolioData(): Promise<PortfolioData> {
  const fullPath = path.join(dataDirectory, 'portfolio.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents) as PortfolioData;
}

export async function updatePortfolioData(data: PortfolioData): Promise<void> {
  const fullPath = path.join(dataDirectory, 'portfolio.json');
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
}
