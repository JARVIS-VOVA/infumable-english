import React from 'react';
import { Form, Field } from 'react-final-form';
import { useCreateTerm } from '../api/createTerms';
import { useUpdateTerm } from '../api/updateTerm';
import { Input, Button } from 'src/features/shared/components/ui';
import type { Term } from '../types/index';

type TermFormProps = {
  initialValues?: Partial<Term>;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const TermForm: React.FC<TermFormProps> = ({ initialValues, onSuccess, onCancel }) => {
  const createMutation = useCreateTerm();
  const updateMutation = useUpdateTerm();

  const isEditMode = !!initialValues?.id;

  const onSubmit = async (values: any) => {
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id: initialValues!.id!, ...values });
      } else {
        await createMutation.mutateAsync({ term: values });
      }
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save term', error);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
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
  );
};
