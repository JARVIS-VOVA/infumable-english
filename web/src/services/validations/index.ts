export const composeValidators = (...validators: any[]) => (value: string) => validators.reduce((error, validator) => error || validator(value), undefined)

export const required = (value: string) => (value || typeof value === 'number' ? undefined : 'Required')
export const email = (value: string) => value && !/.+@.+\..+/i.test(value) ? 'Invalid email address' : undefined

export const minLength = (min: number) => (value: string) => value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLengthPassword = minLength(6)
export const passwordsMatch = (allValues: { password: string }) => (value: string) => allValues.password != value ? "Passwords don't match" : undefined
