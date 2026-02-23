import React from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { BaseLayout } from 'src/features/shared/components/BaseLayout'
import { Button, Card, Input } from 'src/features/shared/components/ui'
import { PaginationControls } from 'src/features/shared/components/PaginationControls'
import ROUTES from 'src/constants/routes'
import { useSources } from '../api/getSources'
import { useCreateSource } from '../api/createSource'
import { useUpdateSource } from '../api/updateSource'
import type { Source } from '../types'

const PAGE_SIZE = 8

const MySourcesPage: React.FC = () => {
  const navigate = useNavigate()
  const [page, setPage] = React.useState(1)
  const { data: mySourcesResponse, isLoading: isMyLoading } = useSources({ page, perPage: PAGE_SIZE })
  const createSourceMutation = useCreateSource()
  const updateSourceMutation = useUpdateSource()
  const [title, setTitle] = React.useState('')
  const [editingId, setEditingId] = React.useState<number | null>(null)
  const [editTitle, setEditTitle] = React.useState('')
  const [editIsPublic, setEditIsPublic] = React.useState(false)

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!title.trim()) return

    try {
      const source = await createSourceMutation.mutateAsync({
        source: {
          title: title.trim(),
          isPublic: false,
        },
      })
      toast.success('Source created')
      setTitle('')
      navigate(`${ROUTES.sources}/${source.id}`)
    } catch (error) {
      toast.error('Could not create source')
      console.error(error)
    }
  }

  const startEditing = (source: Source) => {
    setEditingId(source.id)
    setEditTitle(source.title)
    setEditIsPublic(!!source.isPublic)
  }

  const saveEdit = async (sourceId: number) => {
    if (!editTitle.trim()) return

    try {
      await updateSourceMutation.mutateAsync({
        id: sourceId,
        source: {
          title: editTitle.trim(),
          isPublic: editIsPublic,
        },
      })
      toast.success('Source updated')
      setEditingId(null)
    } catch (error) {
      toast.error('Could not update source')
      console.error(error)
    }
  }

  const mySources = mySourcesResponse?.data || []
  const totalPages = mySourcesResponse?.meta?.totalPages || 1
  const currentPage = mySourcesResponse?.meta?.currentPage || page

  return (
    <BaseLayout title="My Sources">
      <div className="space-y-8">
        <Card padding="lg">
          <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-3 md:items-end">
            <div className="flex-1">
              <Input
                label="Source Name"
                placeholder="Source title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              isLoading={createSourceMutation.isPending}
              disabled={!title.trim() || createSourceMutation.isPending}
            >
              Create
            </Button>
          </form>
        </Card>

        <Card padding="lg">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">My Sources</h3>
          {isMyLoading && <p className="text-slate-500">Loading...</p>}
          {!isMyLoading && mySources.length === 0 && (
            <p className="text-slate-500">No sources yet. Create one above.</p>
          )}

          <div className="space-y-3">
            {mySources.map((source) => (
              <div key={source.id} className="rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-4 space-y-4">
                {editingId === source.id ? (
                  <div className="space-y-3">
                    <Input
                      label="Title"
                      value={editTitle}
                      onChange={(event) => setEditTitle(event.target.value)}
                      fullWidth
                    />
                    <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <input
                        type="checkbox"
                        checked={editIsPublic}
                        onChange={(event) => setEditIsPublic(event.target.checked)}
                      />
                      Public source
                    </label>
                    <div className="flex gap-2">
                      <Button size="sm" variant="primary" isLoading={updateSourceMutation.isPending} onClick={() => saveEdit(source.id)}>
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{source.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => startEditing(source)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => navigate(`${ROUTES.sources}/${source.id}`)}>
                          Open
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                        {source.termsCount || 0} terms
                      </span>
                      <span className="text-[10px] uppercase font-black tracking-widest px-2 py-1 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                        {source.isPublic ? 'Public' : 'Private'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          {!isMyLoading && mySources.length > 0 && (
            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} className="mt-6" />
          )}
        </Card>
      </div>
    </BaseLayout>
  )
}

export default MySourcesPage
