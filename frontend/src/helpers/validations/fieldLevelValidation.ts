export const required = (value: any) => (value ? undefined : 'Required')

export const email = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const minLength = (min: number) => (value: string) =>
  value && value.length < min ? `Must be at least ${min} characters` : undefined

export const minLengthPassword = minLength(6)

export const passwordsMatch = (targetValue: string) => (value: string) =>
  value !== targetValue ? 'Passwords do not match' : undefined

export const composeValidators = (...validators: any[]) => (value: any, allValues: any) =>
  validators.reduce((error, validator) => error || validator(value, allValues), undefined)
