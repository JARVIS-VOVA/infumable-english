import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { BaseLayout } from 'src/features/shared/components/BaseLayout';
import { Button, Card, Input } from 'src/features/shared/components/ui';
import { PaginationControls } from 'src/features/shared/components/PaginationControls';
import ROUTES from 'src/constants/routes';
import api from 'src/lib/axios';
import { useSource } from '../api/getSource';
import { TermForm } from 'src/features/terms/components/TermForm';
import { useUser } from 'src/features/auth/api/getUser';
import { useAnalyzeSource } from '../api/analyzeSource';
import { useUpdateSource } from '../api/updateSource';
import { useDeleteSource } from '../api/deleteSource';
import { createTermsBulk, type BulkCreateTermInput } from 'src/features/terms/api/createTermsBulk';
import type { Source, SourceTerm } from '../types';

const TERMS_PAGE_SIZE = 10;

const SourceView: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const sourceId = Number(id);
  const queryClient = useQueryClient();
  const { data: source, isLoading, error } = useSource(sourceId);
  const { data: currentUser } = useUser();
  const updateSourceMutation = useUpdateSource();
  const deleteSourceMutation = useDeleteSource();
  const analyzeMutation = useAnalyzeSource();
  const [activeTermsTab, setActiveTermsTab] = React.useState<'unlearned' | 'learnt'>('unlearned');
  const [activeAddTab, setActiveAddTab] = React.useState<'manual' | 'analyze' | 'xlsx' | null>(null);
  const [isEditSourceOpen, setIsEditSourceOpen] = React.useState(false);
  const [analyzeText, setAnalyzeText] = React.useState('');
  const [editingTermId, setEditingTermId] = React.useState<number | null>(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editIsPublic, setEditIsPublic] = React.useState(false);
  const [importFileName, setImportFileName] = React.useState('');
  const [importTerms, setImportTerms] = React.useState<BulkCreateTermInput[]>([]);
  const [isParsingImportFile, setIsParsingImportFile] = React.useState(false);
  const [termsPage, setTermsPage] = React.useState(1);
  const isOwner = !!source && currentUser?.id === source.userId;

  const clearImportState = React.useCallback(() => {
    setImportFileName('');
    setImportTerms([]);
  }, []);

  const parseExcelFile = React.useCallback(
    async (file: File) => {
      setIsParsingImportFile(true);
      try {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];

        if (!firstSheetName) {
          clearImportState();
          toast.error('The selected file has no worksheet.');
          return;
        }

        const firstSheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json<(string | number | null)[]>(firstSheet, {
          header: 1,
          raw: false,
          defval: '',
          blankrows: false,
        });

        const parsedTerms = rows
          .map((row) => ({
            phrase: String(row?.[0] ?? '').trim(),
            meaning: String(row?.[1] ?? '').trim(),
          }))
          .filter((row) => row.phrase.length > 0 || row.meaning.length > 0)
          .map((row) => ({
            phrase: row.phrase,
            meaning: row.meaning || null,
            sourceId,
          }));

        setImportFileName(file.name);
        setImportTerms(parsedTerms);

        if (parsedTerms.length === 0) {
          toast.error('No importable rows found. Add phrase (A) or meaning (B) values.');
          return;
        }

        toast.success(`${parsedTerms.length} rows ready for import.`);
      } catch (err) {
        clearImportState();
        toast.error('Could not parse the Excel file.');
        console.error(err);
      } finally {
        setIsParsingImportFile(false);
      }
    },
    [clearImportState, sourceId]
  );

  React.useEffect(() => {
    if (!source) return;
    setEditTitle(source.title);
    setEditIsPublic(!!source.isPublic);
  }, [source]);

  const markKnownMutation = useMutation({
    mutationFn: (termId: number) => api.patch(`/api/v1/terms/${termId}`, { term: { learnt: true } }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['source', sourceId] });
      toast.success('Marked as learnt');
    },
    onError: () => {
      toast.error('Could not update term');
    },
  });

  const markUnlearnedMutation = useMutation({
    mutationFn: (termId: number) => api.patch(`/api/v1/terms/${termId}`, { term: { learnt: false } }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['source', sourceId] });
      toast.success('Moved to unlearned');
    },
    onError: () => {
      toast.error('Could not update term');
    },
  });

  const deleteTermMutation = useMutation({
    mutationFn: (termId: number) => api.delete(`/api/v1/terms/${termId}`),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['source', sourceId] });
      await queryClient.invalidateQueries({ queryKey: ['terms'] });
      toast.success('Term deleted');
    },
    onError: () => {
      toast.error('Could not delete term');
    },
  });

  const importTermsMutation = useMutation({
    mutationFn: createTermsBulk,
    onSuccess: async (createdTerms: SourceTerm[]) => {
      queryClient.setQueryData<Source | undefined>(['source', sourceId], (oldSource) => {
        if (!oldSource) return oldSource;

        const existingTerms = oldSource.terms || [];
        return {
          ...oldSource,
          terms: [...createdTerms, ...existingTerms],
          termsCount: (oldSource.termsCount ?? existingTerms.length) + createdTerms.length,
        };
      });
      await queryClient.invalidateQueries({ queryKey: ['terms'] });
      toast.success(`${createdTerms.length} terms imported`);
      clearImportState();
    },
    onError: (err) => {
      toast.error('Could not import terms from Excel');
      console.error(err);
    },
  });

  const onDropExcelFile = React.useCallback(
    async (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (!selectedFile) return;
      await parseExcelFile(selectedFile);
    },
    [parseExcelFile]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections, open } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: false,
    noClick: true,
    onDrop: onDropExcelFile,
  });

  React.useEffect(() => {
    if (fileRejections.length === 0) return;
    toast.error('Only .xlsx and .xls files are supported.');
  }, [fileRejections]);

  const handleSaveSource = async () => {
    if (!source || !editTitle.trim()) return;

    try {
      await updateSourceMutation.mutateAsync({
        id: source.id,
        source: {
          title: editTitle.trim(),
          isPublic: editIsPublic,
        },
      });
      toast.success('Source updated');
      setIsEditSourceOpen(false);
    } catch (err) {
      toast.error('Could not update source');
      console.error(err);
    }
  };

  const handleDeleteSource = async () => {
    if (!source) return;

    const confirmed = window.confirm(`Delete source "${source.title}"? This action cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteSourceMutation.mutateAsync(source.id);
      toast.success('Source deleted');
      navigate(ROUTES.mySources);
    } catch (err) {
      toast.error('Could not delete source');
      console.error(err);
    }
  };

  const handleAnalyze = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!analyzeText.trim()) return;

    try {
      await analyzeMutation.mutateAsync({
        id: sourceId,
        source: { text: analyzeText },
      });
      setAnalyzeText('');
      toast.success('Terms added from text');
    } catch (err) {
      toast.error('Could not analyze text');
      console.error(err);
    }
  };

  const handleImportTerms = async () => {
    if (importTerms.length === 0 || importTermsMutation.isPending) return;
    await importTermsMutation.mutateAsync(importTerms);
  };

  console.log('importTerms', importTerms);


  const allTerms = source?.terms || [];
  const unlearnedTerms = allTerms.filter((term) => !term.learnt);
  const learntTerms = allTerms.filter((term) => !!term.learnt);
  const visibleTerms = activeTermsTab === 'unlearned' ? unlearnedTerms : learntTerms;
  const totalTermPages = Math.max(1, Math.ceil(visibleTerms.length / TERMS_PAGE_SIZE));
  const currentTermsPage = Math.min(termsPage, totalTermPages);
  const paginatedVisibleTerms = visibleTerms.slice((currentTermsPage - 1) * TERMS_PAGE_SIZE, currentTermsPage * TERMS_PAGE_SIZE);

  React.useEffect(() => {
    setTermsPage(1);
  }, [activeTermsTab, sourceId]);

  React.useEffect(() => {
    if (termsPage > totalTermPages) {
      setTermsPage(totalTermPages);
    }
  }, [termsPage, totalTermPages]);

  const toggleAddTab = (tab: 'manual' | 'analyze' | 'xlsx') => {
    setActiveAddTab((current) => (current === tab ? null : tab));
  };

  return (
    <BaseLayout title="Source View" isLoading={isLoading}>
      {error && (
        <Card className="border-red-500/40 bg-red-500/5">
          <p className="text-red-500">Could not load source.</p>
        </Card>
      )}

      {source && (
        <div className="space-y-8">
          <Card padding="lg">
            {isEditSourceOpen ? (
              <div className="space-y-4">
                <Input
                  label="Title"
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  fullWidth
                />
                <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={editIsPublic}
                    onChange={(event) => setEditIsPublic(event.target.checked)}
                  />
                  Public source
                </label>
              </div>
            ) : (
              <h3 className="text-3xl font-black italic uppercase tracking-tighter">{source.title}</h3>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                {source.termsCount || allTerms.length} terms
              </span>
              <span className="text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                {(isEditSourceOpen ? editIsPublic : source.isPublic) ? 'Public' : 'Private'}
              </span>
            </div>
            {isOwner && (
              <div className="flex flex-wrap gap-2 mt-5">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => navigate(ROUTES.sourcePractice(source.id))}
                >
                  Practice
                </Button>
                {isEditSourceOpen ? (
                  <>
                    <Button
                      size="sm"
                      variant="primary"
                      isLoading={updateSourceMutation.isPending}
                      disabled={!editTitle.trim() || updateSourceMutation.isPending}
                      onClick={handleSaveSource}
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsEditSourceOpen(false);
                        setEditTitle(source.title);
                        setEditIsPublic(!!source.isPublic);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditSourceOpen(true)}
                  >
                    Edit source
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="danger"
                  isLoading={deleteSourceMutation.isPending}
                  onClick={handleDeleteSource}
                >
                  Delete source
                </Button>
              </div>
            )}
          </Card>

          {isOwner && (
            <Card padding="lg">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={activeAddTab === 'manual' ? 'primary' : 'outline'}
                  onClick={() => toggleAddTab('manual')}
                >
                  Add Term Manually
                </Button>
                <Button
                  size="sm"
                  variant={activeAddTab === 'analyze' ? 'primary' : 'outline'}
                  onClick={() => toggleAddTab('analyze')}
                >
                  Analyze Text
                </Button>
                <Button
                  size="sm"
                  variant={activeAddTab === 'xlsx' ? 'primary' : 'outline'}
                  onClick={() => toggleAddTab('xlsx')}
                >
                  Import from Excel
                </Button>
              </div>

              {activeAddTab === 'manual' && (
                <div className="mt-6">
                  <TermForm
                    sourceId={source.id}
                    onSuccess={async () => {
                      await queryClient.invalidateQueries({ queryKey: ['source', sourceId] });
                      await queryClient.invalidateQueries({ queryKey: ['terms'] });
                      toast.success('Term created');
                    }}
                  />
                </div>
              )}

              {activeAddTab === 'analyze' && (
                <form onSubmit={handleAnalyze} className="mt-6 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Add more terms from any text: film subtitles, book paragraphs, articles, or transcripts.
                  </p>
                  <textarea
                    className="w-full min-h-52 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0a0a0c]/50 px-4 py-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
                    placeholder="Paste subtitles, book text, or article text to extract terms..."
                    value={analyzeText}
                    onChange={(event) => setAnalyzeText(event.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={analyzeMutation.isPending}
                    disabled={!analyzeText.trim() || analyzeMutation.isPending}
                  >
                    Analyze text
                  </Button>
                </form>
              )}

              {activeAddTab === 'xlsx' && (
                <div className="mt-6 space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Excel format: column A = phrase, column B = meaning. Rows where both columns are empty are ignored.
                  </p>
                  <div
                    {...getRootProps()}
                    className={`rounded-2xl border border-dashed p-6 transition-colors ${isDragActive
                      ? 'border-primary-500 bg-primary-500/5'
                      : 'border-slate-300 dark:border-white/15'
                      }`}
                  >
                    <input {...getInputProps()} />
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Drag and drop an Excel file here, or use the button to choose a file.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={open}
                        disabled={isParsingImportFile || importTermsMutation.isPending}
                      >
                        Choose .xlsx / .xls file
                      </Button>
                      {importFileName && (
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                          {importFileName}
                        </span>
                      )}
                    </div>
                  </div>
                  {(isParsingImportFile || importTermsMutation.isPending) && (
                    <p className="text-xs font-black uppercase tracking-widest text-primary-500">
                      {isParsingImportFile ? 'Parsing file...' : 'Uploading terms...'}
                    </p>
                  )}
                  {importTerms.length > 0 && (
                    <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      Ready to upload: {importTerms.length} terms
                    </p>
                  )}
                  <Button
                    type="button"
                    variant="primary"
                    isLoading={importTermsMutation.isPending}
                    disabled={importTerms.length === 0 || isParsingImportFile || importTermsMutation.isPending}
                    onClick={handleImportTerms}
                  >
                    Upload terms
                  </Button>
                </div>
              )}
            </Card>
          )}

          <Card padding="lg">
            <div className="flex flex-wrap gap-3 mb-4">
              <Button
                size="sm"
                variant={activeTermsTab === 'unlearned' ? 'primary' : 'outline'}
                onClick={() => setActiveTermsTab('unlearned')}
              >
                Unlearned ({unlearnedTerms.length})
              </Button>
              <Button
                size="sm"
                variant={activeTermsTab === 'learnt' ? 'primary' : 'outline'}
                onClick={() => setActiveTermsTab('learnt')}
              >
                Learnt ({learntTerms.length})
              </Button>
            </div>

            <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-4">Terms</h4>
            {visibleTerms.length === 0 && (
              <p className="text-slate-500">
                {activeTermsTab === 'unlearned' ? 'No unlearned terms.' : 'No learnt terms yet.'}
              </p>
            )}
            <div className="space-y-3">
              {paginatedVisibleTerms.map((term) => (
                <div key={term.id} className="border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3">
                  {editingTermId === term.id ? (
                    <TermForm
                      sourceId={source.id}
                      initialValues={term}
                      onSuccess={async () => {
                        setEditingTermId(null);
                        await queryClient.invalidateQueries({ queryKey: ['source', sourceId] });
                        await queryClient.invalidateQueries({ queryKey: ['terms'] });
                        toast.success('Term updated');
                      }}
                      onCancel={() => setEditingTermId(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-lg text-slate-900 dark:text-white">{term.phrase}</span>
                        <span className="text-xs font-black uppercase tracking-widest text-primary-500">
                          x{term.priority}
                        </span>
                      </div>
                      {isOwner && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setEditingTermId(term.id)}>
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            isLoading={deleteTermMutation.isPending}
                            onClick={() => deleteTermMutation.mutate(term.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            size="sm"
                            variant="glass"
                            isLoading={markKnownMutation.isPending || markUnlearnedMutation.isPending}
                            onClick={() => {
                              if (activeTermsTab === 'unlearned') {
                                markKnownMutation.mutate(term.id);
                              } else {
                                markUnlearnedMutation.mutate(term.id);
                              }
                            }}
                          >
                            {activeTermsTab === 'unlearned' ? 'Mark learnt' : 'Learn again'}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {visibleTerms.length > 0 && (
              <PaginationControls
                currentPage={currentTermsPage}
                totalPages={totalTermPages}
                onPageChange={setTermsPage}
                className="mt-6"
              />
            )}
          </Card>
        </div>
      )}
    </BaseLayout>
  );
};

export default SourceView;
