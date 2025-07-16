import React from 'react'
import {
  Box,
  Typography,
  IconButton,
  Container,
  TextField,
  Grid,
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { Form, Field } from 'react-final-form'

import { personWithFlugImg } from 'src/assets/img'
import { required } from 'src/helpers/validations/fieldLevelValidation'
import {
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} from 'src/api/tagsApi';

const Tags = () => {
  const [editTagId, setEditTagId] = React.useState(null)

  const { data: tags, isLoading: isTagsLoading } = useGetTagsQuery()
  const [createTag, { isLoading: isCreating }] = useCreateTagMutation()
  const [updateTag, { isLoading: isUpdating }] = useUpdateTagMutation()
  const [deleteTag] = useDeleteTagMutation()

  const getIsEditNow = id => id === editTagId

  const handleUpdateTag = editedTag => {
    updateTag(editedTag)
    setEditTagId(null)
  }

  const renderNoTags = () => (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Box component='img' src={personWithFlugImg} sx={{ display: 'flex', margin: '0 auto', maxWidth: '250px' }} />

      <Box sx={{ textAlign: 'center' }}>
        <Typography>
          You don't have any tags yet
        </Typography>
      </Box>

      {renderTagForm()}
    </Box>
  )

  const renderTagForm = (props={}) => {
    const { editTag } = props
    const isEditMode = editTag !== undefined

    return (
      <Form
        onSubmit={isEditMode ? handleUpdateTag : createTag}
        initialValues={isEditMode ? editTag : {}}
        render={formProps => {
          const { handleSubmit, values, invalid, form } = formProps

          return (
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={5}>
                <Field
                  name='title'
                  validate={required}
                  render={({input, meta}) => (
                    <TextField
                      {...input}
                      placeholder='Phrase'
                      helperText={meta.touched && meta.error && meta.error}
                      sx={{input: {color: values.color}}}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Field
                  name='color'
                  validate={required}
                  render={({input, meta}) => (
                    <TextField
                      {...input}
                      placeholder='Color'
                      helperText={meta.touched && meta.error && meta.error}
                      sx={{input: {color: values.color}}}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={3}>
                {!isEditMode && (
                  <IconButton
                    onClick={async () => {
                      try {
                        await handleSubmit();
                        form.restart();
                      } catch (error) {
                        console.error('Error:', error);
                      }
                    }}
                    disabled={invalid || isCreating}
                    type='submit'
                  >
                    {isCreating ? <Box>Loading...</Box> : <CheckIcon />}
                  </IconButton>
                )}
                {isEditMode && (
                  <Box>
                    <IconButton onClick={handleSubmit} disabled={invalid} type='submit'>
                      {(isUpdating && editTagId) ? <Box>Loading...</Box> : <CheckIcon />}
                    </IconButton>
                    <IconButton onClick={() => setEditTagId(null)}>
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

  const renderTags = () => {
    return (
      <>
        <Box mb={2}>
          {renderTagForm()}
        </Box>

        {tags.map(tag => {
          const isEditNow = getIsEditNow(tag.id)

          return (
            <Box key={tag.id} sx={{ width: '100%' }}>
              {isEditNow && renderTagForm({ editTag: { id: tag.id, title: tag.title, color: tag.color } })}

              {!isEditNow && (
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid item xs={5}>
                    <Typography sx={{ color: tag.color }}>
                      {tag.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ color: tag.color }}>
                      {tag.color}
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <IconButton onClick={() => setEditTagId(tag.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteTag(tag.id)}>
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
    <Container maxWidth='sm'>
      {isTagsLoading && <Box>Loading...</Box>}
      {!isTagsLoading && tags.length === 0 && renderNoTags()}
      {!isTagsLoading && tags.length > 0 && renderTags()}
    </Container>
  );
}

export default Tags
