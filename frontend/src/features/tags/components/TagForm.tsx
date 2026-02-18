import React from 'react';
import { Form, Field } from 'react-final-form';
import type { Tag } from '../types';
import { required } from 'src/helpers/validations/fieldLevelValidation';

type TagFormProps = {
  initialValues?: Partial<Tag>;
  onSubmit: (values: any) => void;
  isLoading?: boolean;
  onCancel?: () => void;
};

export const TagForm: React.FC<TagFormProps> = ({ initialValues, onSubmit, isLoading, onCancel }) => {
  const isEditMode = !!initialValues?.id;

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      render={({ handleSubmit, values, invalid }) => (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end bg-gray-800/40 p-6 rounded-2xl border border-gray-700 shadow-xl animate-in fade-in duration-300">
          <div className="flex-1 space-y-1 w-full">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Tag Title</label>
            <Field
              name="title"
              validate={required}
              render={({ input, meta }) => (
                <div>
                  <input
                    {...input}
                    type="text"
                    placeholder="Tag Title"
                    style={{ color: values?.color || 'white' }}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                  />
                  {meta.touched && meta.error && (
                    <p className="text-red-500 text-[10px] mt-1 ml-1">{meta.error}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex-1 space-y-1 w-full">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500 ml-1">Color Hex</label>
            <Field
              name="color"
              validate={required}
              render={({ input, meta }) => (
                <div>
                  <div className="relative">
                    <input
                      {...input}
                      type="text"
                      placeholder="#FFFFFF"
                      className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-2.5 pl-10 text-white outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-inner"
                    />
                    <div
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-gray-600 shadow-sm"
                      style={{ backgroundColor: values?.color || 'transparent' }}
                    />
                  </div>
                  {meta.touched && meta.error && (
                    <p className="text-red-500 text-[10px] mt-1 ml-1">{meta.error}</p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              type="submit"
              disabled={invalid || isLoading}
              className={`flex-1 md:flex-none flex items-center justify-center p-2.5 rounded-xl transition-all shadow-lg font-bold text-xs tracking-widest uppercase min-w-[100px] ${isLoading
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : isEditMode
                    ? 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/20'
                    : 'bg-green-600 hover:bg-green-500 text-white hover:shadow-green-500/20'
                }`}
            >
              {isLoading ? '...' : isEditMode ? 'Save' : 'Create'}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="p-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl transition-all shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </form>
      )}
    />
  );
};
