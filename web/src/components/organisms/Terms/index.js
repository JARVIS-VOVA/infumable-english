import React from 'react'
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { Field, Form } from 'react-final-form'

import { useTerms } from 'src/hooks'
import { personWithFlugImg, ExcelSvg } from 'src/assets/img'
import { required } from 'src/helpers/validations/fieldLevelValidation'
import {
  useGetTermsQuery,
  useCreateTermsMutation,
  useUpdateTermMutation,
  useDeleteTermMutation,
} from 'src/api/termsApi';

const Terms = () => {
  const [editTermId, setEditTermId] = React.useState(null)

  const { data: terms, isLoading: isTermsLoading } = useGetTermsQuery()
  const [createTerms, { isLoading: isCreating }] = useCreateTermsMutation()
  const [updateTerm, { isLoading: isUpdating }] = useUpdateTermMutation()
  const [deleteTerm] = useDeleteTermMutation()

  const { handleImportExcel } = useTerms()

  const getIsEditNow = termId => termId === editTermId

  const handleCreateTerms = newTerm => {
    createTerms({ terms: [newTerm] })
  }

  const handleUpdateTerm = editedTerm => {
    updateTerm(editedTerm)
    setEditTermId(null)
  }

  const renderNoTerms = () => (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box component='img' src={personWithFlugImg} sx={{ display: 'flex', margin: '0 auto', maxWidth: '250px' }} />

      <Box sx={{ textAlign: 'center' }}>
        <Typography>
          You don't have any terms
        </Typography>
        <Typography>
          You can Import terms from excel file
        </Typography>
      </Box>

      <ExcelSvg sx={{ fontSize: 64 }} />

      <Button fullWidth variant='contained' sx={{ maxWidth: '500px' }} onClick={handleImportExcel}>
        Import terms .cvs
      </Button>
    </Box>
  )

  const renderTermForm = (props={}) => {
    const { editTerm } = props
    const isEditMode = editTerm !== undefined

    return (
      <Form
        onSubmit={isEditMode ? handleUpdateTerm : handleCreateTerms}
        initialValues={isEditMode ? editTerm : {}}
        render={formProps => {
          const { handleSubmit, values, invalid, form } = formProps

          return (
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Field
                  name='phrase'
                  validate={required}
                  render={({input, meta}) => (
                    <TextField
                      {...input}
                      placeholder='Phrase'
                      helperText={meta.touched && meta.error && meta.error}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  name='meaning'
                  validate={required}
                  render={({input, meta}) => (
                    <TextField
                      {...input}
                      placeholder='Meaning'
                      helperText={meta.touched && meta.error && meta.error}
                    />
                  )}
                />
              </Grid>

              {/* <Field
                name='tags'
                multiple
                render={({ input, meta }) => {
                  return (
                    <Select
                      {...input}
                      placeholder='Tags'
                      displayEmpty
                      renderValue={selected => {
                        if (!selected.length) {
                          return (
                            <em>Tags</em>
                          )
                        }

                        return (
                          <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map(value => {
                              const tag = tags?.find(tag => tag.title === value)

                              return (
                                <Chip
                                  key={value}
                                  size='small'
                                  label={value}
                                  style={{ color: tag.color }}
                                />
                              )
                            })}
                          </Box>
                        )
                      }}
                    >
                      {tags?.map((tag, index) => (
                        <MenuItem key={index} value={tag.title} style={{ color: tag.color }}>
                          {tag.title}
                        </MenuItem>
                      ))}
                    </Select>
                  )
                }}
              /> */}

              <Grid item xs={2}>
                {!isEditMode && (
                  <IconButton onClick={() => {
                    handleSubmit()
                    form.restart()
                  }}
                    disabled={invalid}
                    type='submit'
                  >
                    {isCreating ? <Box>Loading...</Box> : <CheckIcon />}
                  </IconButton>
                )}
                {isEditMode && (
                  <Box>
                    <IconButton onClick={handleSubmit} disabled={invalid} type='submit'>
                      {isUpdating ? <Box>Loading...</Box> : <CheckIcon />}
                    </IconButton>
                    <IconButton onClick={() => setEditTermId(null)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
              </Grid>
            </Grid>
          )
        }}
      />
    );
  }

  const renderTerms = () => {
    return (
      <>
        <Box mb={2}>
          {renderTermForm()}
        </Box>

        {terms.map(term => {
          const isEditNow = getIsEditNow(term.id)

          return (
            <Box key={term.id}>
              {isEditNow && (
                renderTermForm({
                  editTerm: {
                    id: term.id,
                    phrase: term.phrase,
                    meaning: term.meaning,
                    termTags: term.termTags,
                  }
                })
              )}

              {!isEditNow && (
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid item xs={4}>
                    <Typography>
                      {term.phrase}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>
                      {term.meaning}
                    </Typography>
                  </Grid>

                  {/* <Grid item xs={3} sx={{ display: 'flex', gap: 1 }}>
                    {term.termTags.map(termTag => (
                      <Typography key={termTag.id}>
                        {tags?.find(tag => tag.id === termTag.tagId).title}
                      </Typography>
                    ))}
                  </Grid> */}

                  <Grid item xs={2}>
                    <IconButton onClick={() => setEditTermId(term.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteTerm(term.id)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            </Box>
          )
        })}
      </>
    )
  }

  return (
    <>
      {isTermsLoading && <Box>Loading...</Box>}
      {!isTermsLoading && terms.length === 0 && renderNoTerms()}
      {!isTermsLoading && terms.length > 0 && renderTerms()}
    </>
  )
}

export default Terms
