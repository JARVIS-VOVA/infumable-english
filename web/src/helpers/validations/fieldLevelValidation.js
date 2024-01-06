export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

export const required = value => (value || typeof value === 'number' ? undefined : 'Required')
export const email = value => value && !/.+@.+\..+/i.test(value) ? 'Invalid email address' : undefined

export const minLength = min => value => value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLengthPassword = minLength(6)
export const passwordsMatch = paddsordValues => (value) => paddsordValues != value ? "Passwords don't match" : undefined
