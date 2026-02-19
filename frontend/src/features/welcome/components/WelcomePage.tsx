import React from 'react'
import { BaseLayout } from '../../shared/components/BaseLayout'
import { personWithFlugImg } from 'src/assets/img'
import { Link } from 'react-router-dom'
import { Button, Card } from 'src/features/shared/components/ui'

const WelcomePage: React.FC = () => {
  return (
    <BaseLayout title="Journey Begins">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 py-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
        <div className="flex-1 space-y-12 text-center md:text-left">
          <div className="space-y-6">
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.85] tracking-tighter uppercase italic">
              Master <span className="text-primary-500">English</span><br />
              Every <span className="text-accent-500">Single</span> Day
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl italic border-l-4 border-primary-500/20 pl-6 py-2">
              Unlock your potential with structured vocabulary building.
              Organize and memorize new terms with surgical precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
            <Link to="/terms" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="group pr-6"
              >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t-2 border-primary-500/10">
            <div className="space-y-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white italic">∞</span>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500">Terms Capacity</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl font-black text-primary-500 italic">100%</span>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500">Focus Boost</p>
            </div>
            <div className="space-y-1 hidden md:block">
              <span className="text-3xl font-black text-accent-500 italic">FREE</span>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500">Endless Learning</p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative group w-full max-w-lg">
          <div className="absolute -inset-10 bg-gradient-to-tr from-primary-500/30 to-accent-500/30 blur-[120px] opacity-40 group-hover:opacity-70 transition-all duration-1000 -z-10 animate-pulse-slow"></div>
          <Card padding="none" className="p-4 border-white/10 overflow-visible relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-[2.5rem]"></div>
            <img
              src={personWithFlugImg}
              alt="Success"
              className="relative w-full drop-shadow-[0_50px_50px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_50px_50px_rgba(0,0,0,0.6)] transition-all duration-1000 group-hover:scale-110 group-hover:rotate-3 group-hover:-translate-y-4"
            />
            <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-3xl border-primary-500/20 animate-float shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-black uppercase italic tracking-widest text-slate-900 dark:text-white leading-none">Victory</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">System Secured</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </BaseLayout>
  )
}

export default WelcomePage
