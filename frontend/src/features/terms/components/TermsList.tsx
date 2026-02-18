import React, { useState } from 'react';
import { useTerms } from '../api/getTerms';
import { useDeleteTerm } from '../api/deleteTerm';
import { TermForm } from './TermForm';
import { Card, IconButton, Button } from 'src/features/shared/components/ui';
import toast from 'react-hot-toast';

export const TermsList: React.FC = () => {
  const { data: terms, isLoading, error } = useTerms();
  const deleteMutation = useDeleteTerm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this term?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Term successfully deleted'),
        onError: () => toast.error('System failure: could not delete term'),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-[2rem] border-4 border-primary-500/20 border-t-primary-500 animate-spin"></div>
          <div className="absolute inset-0 w-24 h-24 rounded-[2rem] border-4 border-accent-500/10 border-b-accent-500 animate-spin-reverse delay-150"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-black italic uppercase tracking-[0.2em] text-xs animate-pulse">Retrieving Lexical Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-500/50 bg-red-500/5 max-w-lg mx-auto text-center" padding="lg">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white mb-4">Connection Failed</h3>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-10">{(error as any).message || 'The linguistic terminal is currently unresponsive.'}</p>
        <Button
          variant="danger"
          onClick={() => window.location.reload()}
          fullWidth
        >
          Re-initialize Session
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
      <Card padding="lg">
        <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-10 flex items-center gap-4">
          <span className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </span>
          Forge New <span className="text-primary-500">Expression</span>
        </h3>
        <TermForm onSuccess={() => toast.success('Lexical entry secured')} />
      </Card>

      <section className="space-y-8 pb-20">
        <div className="flex justify-between items-end border-b-2 border-primary-500/10 pb-8">
          <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
            Dictionary <span className="text-accent-500">Manifest</span>
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-1">Total Records</span>
            <span className="text-4xl font-black italic text-primary-500 leading-none">
              {terms?.length?.toString().padStart(2, '0') || '00'}
            </span>
          </div>
        </div>

        {!terms || terms.length === 0 ? (
          <Card padding="lg" className="text-center py-32 border-2 border-dashed border-primary-500/10">
            <div className="max-w-xs mx-auto space-y-8">
              <div className="bg-slate-100 dark:bg-white/5 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto text-slate-300 dark:text-slate-600 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="space-y-3">
                <h4 className="text-3xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white">Absolute Void</h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed">The lexicon is currently empty. Initialize your collection above.</p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
            {terms.map((term) => (
              <Card
                key={term.id}
                className="group hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-500"
                padding="none"
              >
                {editingId === term.id ? (
                  <div className="p-8 md:p-10">
                    <TermForm
                      initialValues={term}
                      onSuccess={() => {
                        setEditingId(null);
                        toast.success('System recalibrated');
                      }}
                      onCancel={() => setEditingId(null)}
                    />
                  </div>
                ) : (
                  <div className="p-8 md:p-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                      <div className="space-y-4">
                        <h4 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors duration-500 leading-none">
                          {term.phrase}
                        </h4>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {term.tags?.map((tag: string) => (
                            <span key={tag} className="text-[9px] uppercase font-black tracking-widest bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 group-hover:border-primary-500/30 group-hover:text-primary-500 transition-all duration-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <IconButton
                          onClick={() => setEditingId(term.id)}
                          variant="glass"
                          color="primary"
                          title="Recalibrate"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(term.id)}
                          variant="glass"
                          color="danger"
                          title="Purge"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </IconButton>
                      </div>
                    </div>

                    <div className="mt-auto space-y-6">
                      <div className="bg-slate-50 dark:bg-black/40 p-6 md:p-8 rounded-[2rem] border border-primary-500/5 relative overflow-hidden group/meaning transition-all duration-500 hover:border-primary-500/20 shadow-inner">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-500 opacity-20 group-hover/meaning:opacity-100 transition-opacity"></div>
                        <span className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400 dark:text-slate-500 block mb-3 leading-none">Definition</span>
                        <p className="text-slate-800 dark:text-slate-100 leading-relaxed font-bold italic text-xl md:text-2xl">{term.meaning}</p>
                      </div>

                      {term.example && (
                        <div className="px-2">
                          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-slate-400 dark:text-slate-500 block mb-3 leading-none">Execution</span>
                          <p className="text-slate-500 dark:text-slate-400 italic font-medium text-base md:text-lg border-l-4 border-primary-500/10 pl-6 py-1 group-hover:border-primary-500/30 transition-all duration-500">
                            "{term.example}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
