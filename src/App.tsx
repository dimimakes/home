import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Linkedin, 
  User, 
  GraduationCap, 
  Cloud, 
  ExternalLink, 
  ChevronRight,
  BookOpen,
  ArrowLeft
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BIO, PROJECTS, PAPERS, THOUGHTS, type Thought } from './data';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tab = 'about' | 'work' | 'thoughts';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [selectedThought, setSelectedThought] = useState<Thought | null>(null);

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'linkedin': return <Linkedin size={18} />;
      case 'user': return <User size={18} />;
      case 'graduation-cap': return <GraduationCap size={18} />;
      case 'cloud': return <Cloud size={18} />;
      default: return <ExternalLink size={18} />;
    }
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-12 md:py-24">
      {/* Navigation */}
      <nav className="flex items-center justify-between mb-16 md:mb-24">
        <div className="flex flex-col">
          <h1 className="text-2xl font-serif font-bold tracking-tight">{BIO.name}</h1>
          <p className="text-xs font-mono text-muted uppercase tracking-widest mt-1">Design Research</p>
        </div>
        <div className="flex gap-6 md:gap-8">
          {(['about', 'work', 'thoughts'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedThought(null);
              }}
              className={cn(
                "text-sm font-medium transition-colors relative py-1",
                activeTab === tab ? "text-ink" : "text-muted hover:text-ink"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      <main>
        <AnimatePresence mode="wait">
          {activeTab === 'about' && (
            <motion.section
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-ink">
                  {BIO.description}
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  {BIO.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors border border-ink/10 rounded-full px-4 py-2 hover:border-accent/30 bg-white/50"
                    >
                      {renderSocialIcon(social.icon)}
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'work' && (
            <motion.section
              key="work"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-16"
            >
              <div className="space-y-8">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted border-b border-ink/5 pb-2">Recent Projects</h2>
                <div className="grid gap-12">
                  {PROJECTS.map((project) => (
                    <div key={project.title} className="group space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-serif font-bold group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                      <p className="text-muted leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.map(tag => (
                          <span key={tag} className="text-[10px] font-mono uppercase tracking-wider bg-ink/5 px-2 py-0.5 rounded text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted border-b border-ink/5 pb-2">Recent Papers</h2>
                <div className="space-y-8">
                  {PAPERS.map((paper) => (
                    <div key={paper.title} className="group flex gap-6 items-start">
                      <span className="text-xs font-mono text-muted pt-1.5">{paper.year}</span>
                      <div className="space-y-2 flex-1">
                        <a 
                          href={paper.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-lg font-serif font-semibold leading-snug group-hover:text-accent transition-colors block"
                        >
                          {paper.title}
                        </a>
                        <p className="text-sm text-muted leading-relaxed italic">{paper.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}

          {activeTab === 'thoughts' && (
            <motion.section
              key="thoughts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {!selectedThought ? (
                <div className="space-y-12">
                  <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-muted border-b border-ink/5 pb-2">Writing</h2>
                  <div className="divide-y divide-ink/5">
                    {THOUGHTS.map((thought) => (
                      <button
                        key={thought.id}
                        onClick={() => setSelectedThought(thought)}
                        className="w-full text-left py-8 group first:pt-0"
                      >
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-3">
                          <h3 className="text-xl font-serif font-bold group-hover:text-accent transition-colors">
                            {thought.title}
                          </h3>
                          <span className="text-xs font-mono text-muted">{thought.date}</span>
                        </div>
                        <p className="text-muted leading-relaxed mb-4">{thought.excerpt}</p>
                        <div className="flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          Read More <ChevronRight size={14} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <button 
                    onClick={() => setSelectedThought(null)}
                    className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-8"
                  >
                    <ArrowLeft size={16} /> Back to thoughts
                  </button>
                  <article className="markdown-body">
                    <div className="mb-12">
                      <span className="text-xs font-mono text-muted uppercase tracking-widest block mb-2">{selectedThought.date}</span>
                      <h1 className="!mt-0 !mb-4">{selectedThought.title}</h1>
                      <div className="h-1 w-12 bg-accent/20 rounded-full" />
                    </div>
                    <ReactMarkdown>{selectedThought.content}</ReactMarkdown>
                  </article>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-32 pt-12 border-t border-ink/5 text-center">
        <p className="text-xs font-mono text-muted uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {BIO.name}
        </p>
      </footer>
    </div>
  );
}
