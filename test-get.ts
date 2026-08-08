import { getPortfolioData } from './src/data/repository';

async function test() {
  const data = await getPortfolioData();
  console.log(data.projects.map(p => p.id));
}
test();
