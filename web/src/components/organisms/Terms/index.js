import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { Field, Form } from 'react-final-form'

import { useTags, useTerms } from 'src/hooks'
import { personWithFlugImg, ExcelSvg } from 'src/assets/img'
import { required } from 'src/helpers/validations/fieldLevelValidation'

const Terms = () => {
  const {
    fetchTermsIfNotFetched,
    createTerms,
    updateTerm,
    deleteTerm,
    terms,
    isTermsFetching,
    isTermsFetched,
    handleImportExcel,
  } = useTerms()
  const {
    tags,
    fetchTagsIfNotFetched,
  } = useTags()

  const [editTermId, setEditTermId] = React.useState()

  React.useEffect(() => {
    fetchTermsIfNotFetched()
    fetchTagsIfNotFetched()
  }, [])

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
        // initialValues={isEditMode ? editTerm : {}}
        initialValues={{ phrase: 'q', meaning: 'q', tags: ['q'] }}
        render={formProps => {
          const { handleSubmit, values, invalid, form } = formProps

          return (
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={3}>
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

              <Grid item xs={4}>
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

              <Field
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
              />

              <Grid item xs={2}>
                {!isEditMode && (
                  <IconButton onClick={() => {
                    handleSubmit()
                    form.restart()
                  }} disabled={invalid} type='submit'>
                    <CheckIcon />
                  </IconButton>
                )}
                {isEditMode && (
                  <Box>
                    <IconButton onClick={handleSubmit} disabled={invalid} type='submit'>
                      <CheckIcon />
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
                  <Grid item xs={3}>
                    <Typography>
                      {term.phrase}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography>
                      {term.meaning}
                    </Typography>
                  </Grid>

                  <Grid item xs={3} sx={{ display: 'flex', gap: 1 }}>
                    {term.termTags.map(termTag => (
                      <Typography key={termTag.id}>
                        {tags?.find(tag => tag.id === termTag.tagId).title}
                      </Typography>
                    ))}
                  </Grid>

                  <Grid item xs={2}>
                    <IconButton onClick={() => setEditTermId(term.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteTerm({ id: term.id })}>
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
      {isTermsFetching && <Box>Loading...</Box>}
      {isTermsFetched && terms.length === 0 && renderNoTerms()}
      {isTermsFetched && terms.length > 0 && renderTerms()}
    </>
  )
}

Terms.propTypes = {
  terms: PropTypes.arrayOf(PropTypes.object),
  handleImportExcel: PropTypes.func,
}

export default Terms
