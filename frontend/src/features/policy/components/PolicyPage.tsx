import React from 'react'
import { BaseLayout } from 'src/features/shared/components/BaseLayout'

const POLICY_SECTIONS = [
  {
    title: 'Introduction',
    content:
      'Welcome to Infumable English. This System Policy outlines the terms and conditions governing your use of our platform. By accessing or using our services, you agree to be bound by these policies. Please read them carefully before proceeding.',
  },
  {
    title: 'Data Collection & Usage',
    content:
      'We collect only the minimum data necessary to provide and improve our services, including your email address, account preferences, and learning activity data such as terms, sources, and tags you create. Your data is used exclusively to deliver personalized learning experiences and is never sold to third parties.',
  },
  {
    title: 'User Content',
    content:
      'You retain full ownership of all content you create on the platform, including terms, definitions, sources, and tags. By submitting content marked as "public," you grant other users a non-exclusive, read-only license to view and learn from that content. You may revoke public access at any time by changing the visibility of your content.',
  },
  {
    title: 'Account Security',
    content:
      'You are responsible for maintaining the confidentiality of your account credentials. We implement industry-standard security measures including encrypted password storage and secure session management. You agree to notify us immediately of any unauthorized access to your account.',
  },
  {
    title: 'Acceptable Use',
    content:
      'You agree not to use the platform to upload, share, or distribute content that is offensive, defamatory, or infringes on the intellectual property rights of others. Automated scraping, bot activity, and any attempts to disrupt or compromise the service are strictly prohibited.',
  },
  {
    title: 'Service Availability',
    content:
      'We strive to maintain high availability of our services but do not guarantee uninterrupted access. Scheduled maintenance windows will be communicated in advance when possible. We reserve the right to modify, suspend, or discontinue any part of the service with reasonable notice.',
  },
  {
    title: 'Intellectual Property',
    content:
      'The Infumable English platform, including its design, codebase, branding, and proprietary algorithms, is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from any part of the platform without explicit written permission.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'Infumable English is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the amount paid by you, if any, for accessing premium features.',
  },
  {
    title: 'Policy Updates',
    content:
      'We reserve the right to update this policy at any time. Material changes will be communicated via email or in-app notification. Continued use of the platform after updates constitutes acceptance of the revised policy. The date of the last update is displayed at the top of this page.',
  },
]

const PolicyPage: React.FC = () => {
  return (
    <BaseLayout title="System Policy">
      <div className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Last updated badge */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 px-4 rounded-full bg-primary-500/10 text-primary-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Last updated: February 18, 2026
          </div>
        </div>

        {/* Policy sections */}
        {POLICY_SECTIONS.map((section, index) => (
          <div
            key={section.title}
            className="glass-card rounded-3xl p-8 border border-primary-500/5 hover:border-primary-500/20 transition-all duration-500 group"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-start gap-5">
              <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-500 font-black text-sm italic group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-black italic uppercase tracking-tight text-slate-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Contact footer */}
        <div className="glass-card rounded-3xl p-8 border border-accent-500/10 mt-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center shadow-lg shadow-accent-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-black italic uppercase tracking-tight text-slate-900 dark:text-white">
                Questions about this policy?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                If you have any concerns or questions regarding this policy, please reach out to us through our GitHub repository.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default PolicyPage
