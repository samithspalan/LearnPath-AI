import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './BentoGrid.css';

const BENTO_ITEMS = [
  {
    title: 'Dynamic Assessments',
    description: 'Take adaptive coding assessments to establish an accurate baseline of your skills and identify areas for growth.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    size: 'large',
    accent: 'purple',
  },
  {
    title: 'Curated Learning Plans',
    description: 'Follow structurally generated, weekly roadmaps tailored precisely to bridge your skill gaps.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    size: 'small',
    accent: 'blue',
  },
  {
    title: 'AI Mentorship Assistant',
    description: 'Chat with our intelligent tutor for real-time code reviews, debug assistance, and career strategies.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    size: 'small',
    accent: 'purple',
  },
  {
    title: 'Rich Progress Analytics',
    description: 'Track every milestone of your journey visually with comprehensive dashboards to ensure you hit your goals.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 3 3 21 21 21" />
        <polyline points="3 21 9 14 15 18 21 9" />
      </svg>
    ),
    size: 'medium',
    accent: 'blue',
  },
];

const BentoGrid = () => {
  const [bentoRef, bentoVisible] = useScrollReveal(0.15);

  return (
    <section 
      ref={bentoRef} 
      className={`bento-section ${bentoVisible ? 'is-revealed' : ''}`}
    >
      <div className="section-header">
        <h2>Core Platform Features</h2>
      </div>

      <div className="bento-grid-premium">
        {BENTO_ITEMS.map((item, index) => (
          <div 
            key={index} 
            className={`bento-card-premium bento-card--${item.size} accent-${item.accent}`}
            style={{ '--index': index }}
          >
            <div className="bento-card__glass"></div>
            <div className="bento-card__content">
              <div className="bento-card__icon-wrapper">
                 {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            
            {/* Ambient Background Glow */}
            <div className="bento-card__glow-static"></div>
            
            {/* Dynamic Rotating Gradient Border */}
            <div className="bento-card__animated-border"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BentoGrid;
