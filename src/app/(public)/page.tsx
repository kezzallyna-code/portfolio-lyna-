import { getPortfolioData } from '@/data/repository';
import Hero from '@/components/Hero';
import TechnicalSuperpowers from '@/components/TechnicalSuperpowers';
import SelectedProjects from '@/components/SelectedProjects';
import ProfessionalTimeline from '@/components/ProfessionalTimeline';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Languages from '@/components/Languages';
import UiUxShowcase from '@/components/UiUxShowcase';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main>
      <Hero data={data.about} />
      <Education education={data.education} />
      <Languages languages={data.languages} />
      <TechnicalSuperpowers data={data.superpowers} />
      {data.uiUxVideos && data.uiUxVideos.length > 0 && <UiUxShowcase projects={data.uiUxVideos} />}
      <SelectedProjects projects={data.projects} />
      <ProfessionalTimeline experience={data.experience} />
      <Certifications certifications={data.certifications} />
      <CTA />
      <Footer socials={data.socials} name={data.about.name} role={data.about.role} />
    </main>
  );
}
