import React from 'react'
import { Form, Field } from 'react-final-form'
import { useCreateTerm } from '../api/createTerms'
import { useUpdateTerm } from '../api/updateTerm'
import { Input, Button } from 'src/features/shared/components/ui'
import type { Term } from '../types/index'
import { useSources } from 'src/features/sources/api/getSources'

type TermFormProps = {
  initialValues?: Partial<Term>;
  onSuccess?: () => void;
  onCancel?: () => void;
  sourceId?: number;
};

export const TermForm: React.FC<TermFormProps> = ({ initialValues, onSuccess, onCancel, sourceId }) => {
  const createMutation = useCreateTerm()
  const updateMutation = useUpdateTerm()
  const { data: sourcesResponse } = useSources({ page: 1, perPage: 100 })
  const sources = sourcesResponse?.data || []

  const isEditMode = !!initialValues?.id
  const hasLockedSource = Number.isFinite(sourceId)
  const defaultSourceId = sourceId ?? initialValues?.sourceId

  const onSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        sourceId: Number(values.sourceId),
      }

      if (isEditMode) {
        await updateMutation.mutateAsync({ id: initialValues!.id!, term: payload })
      } else {
        await createMutation.mutateAsync({ term: payload })
      }
      onSuccess?.()
    } catch (error) {
      console.error('Failed to save term', error)
    }
  }

  const validate = (values: any) => {
    const errors: Record<string, string> = {}
    if (!values.phrase?.trim()) errors.phrase = 'Phrase is required'
    if (!values.sourceId) errors.sourceId = 'Source is required'
    return errors
  }

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={{ ...initialValues, sourceId: defaultSourceId }}
      render={({ handleSubmit, submitting, invalid }) => (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field name="phrase">
              {({ input, meta }) => (
                <Input
                  {...input}
                  label="Phrase"
                  placeholder="Enter term or phrase"
                  error={meta.touched && meta.error}
                  fullWidth
                />
              )}
            </Field>
            <Field name="meaning">
              {({ input, meta }) => (
                <Input
                  {...input}
                  label="Definition"
                  placeholder="What does it mean?"
                  error={meta.touched && meta.error}
                  fullWidth
                />
              )}
            </Field>
          </div>

          {!hasLockedSource && (
            <Field name="sourceId">
              {({ input, meta }) => (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black uppercase italic tracking-widest text-slate-500 dark:text-slate-400 ml-1">
                    Source
                  </label>
                  <select
                    {...input}
                    className={`
                      h-12 w-full rounded-2xl border-2 bg-white/50 dark:bg-[#0a0a0c]/50 px-4 py-2 text-sm backdrop-blur-sm
                      dark:text-slate-100 focus:outline-none transition-all duration-300
                      ${meta.touched && meta.error
                        ? 'border-red-500 focus:ring-4 focus:ring-red-500/10'
                        : 'border-slate-200 dark:border-white/10 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:focus:border-primary-500/50'}
                    `}
                  >
                    <option value="">Select source</option>
                    {sources.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.title}
                      </option>
                    ))}
                  </select>
                  {meta.touched && meta.error && (
                    <p className="text-[10px] font-bold uppercase tracking-tight ml-1 text-red-500">{meta.error}</p>
                  )}
                </div>
              )}
            </Field>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            {onCancel && (
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={onCancel}
                disabled={submitting}
              >
                Discard
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={submitting}
              disabled={invalid || submitting}
              className="min-w-[140px]"
            >
              {isEditMode ? 'Authorize Sync' : 'Secure Entry'}
            </Button>
          </div>

        </form>
      )}
    />
  )
}
