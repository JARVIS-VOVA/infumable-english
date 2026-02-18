import React, { useState } from 'react';
import { useTags } from '../api/getTags';
import { useCreateTag, useUpdateTag, useDeleteTag } from '../api/mutations';
import { TagForm } from './TagForm';
import toast from 'react-hot-toast';
import { personWithFlugImg } from 'src/assets/img';

export const TagsList: React.FC = () => {
  const { data: tags, isLoading, error } = useTags();
  const createMutation = useCreateTag();
  const updateMutation = useUpdateTag();
  const deleteMutation = useDeleteTag();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success('Tag removed'),
        onError: () => toast.error('Failed to delete tag'),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-r-2 border-blue-500"></div>
        <p className="text-gray-500 font-medium animate-pulse">Retrieving your tags...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-2xl">
        <h4 className="font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Sync failed
        </h4>
        <p className="text-sm opacity-80 mt-1">{(error as any).message || 'Connection lost'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative">
          <TagForm
            onSubmit={(values) => createMutation.mutate(values, {
              onSuccess: () => toast.success('New tag created')
            })}
            isLoading={createMutation.isPending}
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-gray-800 pb-5">
          <h3 className="text-2xl font-black tracking-tight text-white uppercase italic">
            Vocabulary <span className="text-blue-500">Categories</span>
          </h3>
          <div className="bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              {tags?.length || 0} active
            </span>
          </div>
        </div>

        {!tags || tags.length === 0 ? (
          <div className="text-center py-24 bg-gray-800/20 rounded-[2.5rem] border-2 border-dashed border-gray-800 flex flex-col items-center space-y-6">
            <img src={personWithFlugImg} alt="No tags" className="w-48 opacity-40 grayscale hover:grayscale-0 transition-all duration-700" />
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-gray-400 italic">No labels found</h4>
              <p className="text-gray-600 text-sm font-medium">Create your first tag to start organizing your journey.</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag) => (
              <div key={tag.id} className="group relative bg-gray-900/40 hover:bg-gray-800/80 border border-gray-800 hover:border-blue-500/30 rounded-2xl transition-all duration-500 shadow-xl overflow-hidden">
                {editingId === tag.id ? (
                  <div className="p-4 bg-gray-900/90 backdrop-blur-md">
                    <TagForm
                      initialValues={tag}
                      onSubmit={(values) => updateMutation.mutate({ id: tag.id, ...values }, {
                        onSuccess: () => {
                          setEditingId(null);
                          toast.success('Tag updated');
                        }
                      })}
                      onCancel={() => setEditingId(null)}
                      isLoading={updateMutation.isPending}
                    />
                  </div>
                ) : (
                  <div className="p-6 h-full flex flex-col transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-6">
                      <div
                        className="w-10 h-10 rounded-2xl shadow-lg border border-white/10 flex items-center justify-center text-xl font-black"
                        style={{ backgroundColor: tag.color, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                      >
                        {tag.title.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex gap-1 translate-x-2 -translate-y-2">
                        <button
                          onClick={() => setEditingId(tag.id)}
                          className="p-2.5 text-gray-600 hover:text-blue-400 bg-gray-800/50 hover:bg-blue-400/10 rounded-xl transition-all border border-transparent hover:border-blue-500/20"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(tag.id)}
                          className="p-2.5 text-gray-600 hover:text-red-400 bg-gray-800/50 hover:bg-red-400/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-auto space-y-2">
                      <h4 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight line-clamp-1">
                        {tag.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }}></div>
                        <code className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{tag.color}</code>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-colors"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
