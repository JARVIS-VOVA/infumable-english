import React from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button, Card, Input } from 'src/features/shared/components/ui'
import ROUTES from 'src/constants/routes'
import { useCreateSource } from '../api/createSource'

const ManualSourceCreator: React.FC = () => {
  const navigate = useNavigate()
  const createMutation = useCreateSource()

  const [title, setTitle] = React.useState('')

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!title.trim()) return

    try {
      const source = await createMutation.mutateAsync({
        source: {
          title: title.trim(),
          isPublic: false,
        },
      })
      toast.success('Source created. Add terms one by one.')
      navigate(`${ROUTES.sources}/${source.id}`)
    } catch (error) {
      toast.error('Could not create source')
      console.error(error)
    }
  }

  return (
    <Card padding="lg">
      <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Add One By One</h3>
      <form onSubmit={handleCreate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Source title"
            placeholder="My daily words"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={createMutation.isPending}
          disabled={!title.trim() || createMutation.isPending}
        >
          Create source
        </Button>
      </form>
    </Card>
  )
}

export default ManualSourceCreator
