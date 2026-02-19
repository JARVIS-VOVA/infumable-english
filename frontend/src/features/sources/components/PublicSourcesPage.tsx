import React from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { BaseLayout } from 'src/features/shared/components/BaseLayout'
import { Button, Card } from 'src/features/shared/components/ui'
import { PaginationControls } from 'src/features/shared/components/PaginationControls'
import ROUTES from 'src/constants/routes'
import { useCloneSource } from '../api/cloneSource'
import { usePublicSources } from '../api/getPublicSources'

const PAGE_SIZE = 8

const PublicSourcesPage: React.FC = () => {
  const navigate = useNavigate()
  const [page, setPage] = React.useState(1)
  const { data: publicSourcesResponse, isLoading: isPublicLoading } = usePublicSources({ page, perPage: PAGE_SIZE })
  const cloneMutation = useCloneSource()

  const handleClone = async (sourceId: number) => {
    try {
      const source = await cloneMutation.mutateAsync(sourceId)
      toast.success('Source copied to your account')
      navigate(`${ROUTES.sources}/${source.id}`)
    } catch (error) {
      toast.error('Could not clone source')
      console.error(error)
    }
  }

  const publicSources = publicSourcesResponse?.data || []
  const totalPages = publicSourcesResponse?.meta?.totalPages || 1
  const currentPage = publicSourcesResponse?.meta?.currentPage || page

  return (
    <BaseLayout title="Public Sources">
      <Card padding="lg">
        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">Public Sources</h3>
        {isPublicLoading && <p className="text-slate-500">Loading...</p>}
        {!isPublicLoading && publicSources.length === 0 && (
          <p className="text-slate-500">No public sources yet.</p>
        )}
        <div className="space-y-3">
          {publicSources.map((source) => (
            <div key={source.id} className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-white/10 px-4 py-3">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{source.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {source.authorUsername}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {source.termsCount || 0} terms
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                isLoading={cloneMutation.isPending}
                onClick={() => handleClone(source.id)}
              >
                Add to my list
              </Button>
            </div>
          ))}
        </div>
        {!isPublicLoading && publicSources.length > 0 && (
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} className="mt-6" />
        )}
      </Card>
    </BaseLayout>
  )
}

export default PublicSourcesPage
