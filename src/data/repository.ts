import fs from 'fs';
import path from 'path';
import { PortfolioData } from './schema';

const dataDirectory = path.join(process.cwd(), 'src/data/json');

export async function getPortfolioData(): Promise<PortfolioData> {
  const fullPath = path.join(dataDirectory, 'portfolio.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents) as PortfolioData;
}

export async function updatePortfolioData(data: Partial<PortfolioData>): Promise<void> {
  const fullPath = path.join(dataDirectory, 'portfolio.json');
  
  // Read existing data to prevent data loss from partial payloads
  const existingContents = fs.readFileSync(fullPath, 'utf8');
  const existingData = JSON.parse(existingContents) as PortfolioData;

  // Deep merge or carefully construct the new object to ensure safety
  const newData: PortfolioData = {
    about: { ...existingData.about, ...(data.about || {}) },
    superpowers: {
      skills: data.superpowers?.skills || existingData.superpowers?.skills || [],
      software: data.superpowers?.software || existingData.superpowers?.software || []
    },
    education: data.education || existingData.education || [],
    languages: data.languages || existingData.languages || [],
    projects: data.projects || existingData.projects || [],
    uiUxVideos: data.uiUxVideos || existingData.uiUxVideos || [],
    experience: data.experience || existingData.experience || [],
    certifications: data.certifications || existingData.certifications || [],
    socials: { ...existingData.socials, ...(data.socials || {}) }
  };

  fs.writeFileSync(fullPath, JSON.stringify(newData, null, 2), 'utf8');
}
