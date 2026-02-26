type ValidatorValue = unknown
type Validator = (value: ValidatorValue, allValues: object) => string | undefined

export const required: Validator = (value) => (value ? undefined : 'Required')

export const email: Validator = (value) =>
  typeof value === 'string' && value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

export const minLength = (min: number): Validator => (value) =>
  typeof value === 'string' && value.length < min ? `Must be at least ${min} characters` : undefined

export const minLengthPassword = minLength(6)

export const passwordsMatch: Validator = (value, allValues) =>
  value !== (allValues as { password?: unknown }).password ? 'Passwords do not match' : undefined

export const composeValidators = (...validators: Validator[]) => (value: ValidatorValue, allValues: object) =>
  validators.reduce<string | undefined>((error, validator) => error ?? validator(value, allValues), undefined)
