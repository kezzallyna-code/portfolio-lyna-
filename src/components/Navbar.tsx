import Link from 'next/link';
import { getPortfolioData } from '@/data/repository';

export default async function Navbar() {
  const data = await getPortfolioData();

  return (
    <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '0.05em' }}>
        <Link href="/">LYNA KEZZAL</Link>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <a href="#projects" style={{ textDecoration: 'none', color: 'inherit' }}>Projects</a>
        <a href="#experience" style={{ textDecoration: 'none', color: 'inherit' }}>Experience</a>
        <a href="#skills" style={{ textDecoration: 'none', color: 'inherit' }}>Skills</a>
        <a href="#education" style={{ textDecoration: 'none', color: 'inherit' }}>Education</a>
        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.socials?.email || 'kezzellina@gmail.com'}`} target="_blank" rel="noopener noreferrer" className="nav-link-admin" style={{ border: '1px solid var(--card-border)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>Contact</a>
      </div>
    </nav>
  );
}
