import React from 'react';
import { Box, Heart, Github, Code, Sparkles, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpen3DLab: () => void;
  onOpenAdmin: () => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpen3DLab,
  onOpenAdmin,
  onOpenAI
}) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Project Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
                  <Box className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-extrabold text-white font-heading tracking-tight">
                TECHVERSE
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                3D PLATFORM
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              A comprehensive 3D Electronics E-Commerce platform built as a <strong>BCA Final-Year Capstone Project</strong>. Integrates real-time WebGL mesh generation, interactive exploded architectural views, and full client-side commerce workflows.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>React 19 • TypeScript • Three.js • Tailwind CSS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold font-heading uppercase text-xs tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('products')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  All Products Catalog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('categories')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Category Explorer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpen3DLab}
                  className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Product Lab</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Features & Prototypes */}
          <div className="space-y-3">
            <h4 className="text-white font-bold font-heading uppercase text-xs tracking-wider">
              Project Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={onOpenAI}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>AI Hardware Advisor</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1"
                >
                  <ShieldCheck className="w-3 h-3 text-purple-400" />
                  <span>Admin CRUD Console</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500">Exploded View Engine</span>
              </li>
              <li>
                <span className="text-slate-500">Side-by-Side Specs Matrix</span>
              </li>
            </ul>
          </div>

          {/* Academic Attribution */}
          <div className="space-y-3">
            <h4 className="text-white font-bold font-heading uppercase text-xs tracking-wider">
              Academic Context
            </h4>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 text-[11px]">
              <div className="text-white font-semibold">BCA Final-Year Examination</div>
              <div className="text-slate-400">Department of Computer Applications</div>
              <div className="text-cyan-400 font-mono">Academic Year 2025–2026</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} TECHVERSE 3D Electronics. Created for academic demonstration & evaluation.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-current" />
            <span>and Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
