'use client';

import { useTheme } from './ThemeEngine';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      style={{ 
        background: 'transparent', 
        border: '1px solid var(--card-border)', 
        color: 'var(--text-primary)', 
        padding: '0.5rem 1rem', 
        borderRadius: '8px', 
        cursor: 'pointer' 
      }}
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
