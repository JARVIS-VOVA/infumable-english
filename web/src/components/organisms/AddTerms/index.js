import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardActions,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Divider,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import RedoIcon from '@mui/icons-material/Redo'
import AcUnitIcon from '@mui/icons-material/AcUnit'
// import AddIcon from '@mui/icons-material/Add'

import { useTags, useTerms } from 'src/hooks'
import { required } from 'src/helpers/validations/fieldLevelValidation'

const EMPTY_TERM = {
  phrase: '',
  meaning: '',
  // tags: [],
}

const AddTerm = props => {
  const { createTerms } = useTerms()
  // const { tags, fetchTagsIfNotFetched } = useTags()

  // React.useEffect(() => {
  //   fetchTagsIfNotFetched()
  // }, []);

  let submitFunction
  let pushFunction
  let popFunction

  return (
    <Box>
      <Container maxWidth='sm'>
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant='h4'>
              Добавлення слова
            </Typography>

            <Form
              mutators={{
                ...arrayMutators
              }}
              onSubmit={createTerms}
              initialValues = {{
                terms: [
                  EMPTY_TERM,
                ],
              }}
              render={({
                handleSubmit,
                invalid,
                form: {
                  mutators: { push, pop }
                }, // injected from final-form-arrays above
                pristine,
                form,
                submitting,
                values,
              }) => {
                submitFunction = handleSubmit
                pushFunction = push
                popFunction = pop

                return (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 4 }}>
                    <FieldArray name="terms">
                      {({ fields }) => (
                        fields.map((name, index) => {
                          return (
                            <Box key={name}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {/* <Field
                                  name={`${name}.tags`}
                                  render={({ input, meta }) => {
                                    return (
                                      <Select
                                        {...input}
                                        placeholder='Tags'
                                        multiple
                                        input={
                                          <Box>
                                            <Chip
                                              color="primary"
                                              size="small"
                                              // onClick={handleAddNewTag}
                                              onClick={() => {
                                                input.onBlur()
                                                input.onChange()
                                                input.onFocus()
                                              }}
                                              onDelete={handleAddNewTag}
                                              deleteIcon={<AddIcon />}
                                              label='Add tag'
                                            />
                                          </Box>
                                        }
                                        renderValue={(selected) => (
                                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                              <Chip key={value} label={value} />
                                            ))}

                                            <Chip
                                              color="primary"
                                              size="small"
                                              onClick={handleAddNewTag}
                                              onDelete={handleAddNewTag}
                                              deleteIcon={<AddIcon />}
                                              label='Add tag'
                                            />
                                          </Box>
                                        )}
                                      >
                                        {tags?.map((tag, index) => (
                                          <MenuItem key={index} value={tag}>
                                            {tag}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    )
                                  }}
                                /> */}

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                                  <Typography sx={{ mt: 2 }}>{index + 1}.</Typography>

                                  <Field
                                    name={`${name}.phrase`}
                                    validate={required}
                                    render={({ input, meta }) => (
                                      <TextField
                                        {...input}
                                        placeholder='Phrase'
                                        helperText={meta.touched && meta.error && meta.error}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position='start'>
                                              <AcUnitIcon fontSize='small' sx={{ transform: 'scaleX(-1) rotate(45deg)' }} />
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                    )}
                                  />

                                  <RedoIcon sx={{ mt: 2 }} />

                                  <Field
                                    name={`${name}.meaning`}
                                    validate={required}
                                    render={({ input, meta }) => (
                                      <TextField
                                        {...input}
                                        placeholder='meaning'
                                        helperText={meta.touched && meta.error && meta.error}
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position='start'>
                                              <AcUnitIcon fontSize='small' sx={{ transform: 'scaleX(-1) rotate(45deg)' }} />
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                    )}
                                  />

                                  <Box sx={{ mt: 1 }}>
                                    <IconButton onClick={() => fields.remove(index)}>
                                      <DeleteOutlineIcon />
                                    </IconButton>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          )
                        })
                      )}
                    </FieldArray>
                  </Box>
                )
              }}
            />
          </CardContent>

          <Divider />

          <CardActions sx={{ p: 3, display: 'flex', gap: 1 }}>
            <Button fullWidth variant='outlined' onClick={() => popFunction('terms')}>
              Remove Last
            </Button>
            <Button fullWidth variant='outlined' onClick={() => pushFunction('terms', EMPTY_TERM)}>
              Add Term
            </Button>

            <Button fullWidth variant='contained' onClick={event => submitFunction(event)}>
              Create Terms
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  )
}

AddTerm.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.object),
  handleImportExcel: PropTypes.func,
}

export default AddTerm
