import React from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Button, Card, Input } from 'src/features/shared/components/ui'
import ROUTES from 'src/constants/routes'
import { useCreateSource } from '../api/createSource'

const TextAnalyzer: React.FC = () => {
  const navigate = useNavigate()
  const createMutation = useCreateSource()

  const [title, setTitle] = React.useState('')
  const [text, setText] = React.useState('')
  const [isPublic, setIsPublic] = React.useState(false)

  const handleAnalyze = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!title.trim() || !text.trim()) return

    try {
      const source = await createMutation.mutateAsync({
        source: {
          title: title.trim(),
          text,
          isPublic,
        },
      })
      toast.success('Text analyzed successfully')
      navigate(`${ROUTES.sources}/${source.id}`)
    } catch (error) {
      toast.error('Could not analyze this text')
      console.error(error)
    }
  }

  return (
    <Card padding="lg">
      <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Text Analyzer</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
        Paste any English text to extract useful terms. You can use movie subtitles, book chapters, articles, podcast transcripts, or any text you want to learn from.
      </p>
      <form onSubmit={handleAnalyze} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Title"
            placeholder="Book or movie title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            fullWidth
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="source-content" className="text-xs font-black uppercase italic tracking-widest text-slate-500 dark:text-slate-400 ml-1 block">
            Text
          </label>
          <textarea
            id="source-content"
            className="w-full min-h-72 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0a0a0c]/50 px-4 py-3 text-sm focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all"
            placeholder="Example: movie subtitles, a page from a book, or an article..."
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>

        <div className="mb-2">
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(event) => setIsPublic(event.target.checked)}
            />
            <span className="text-sm text-slate-600 dark:text-slate-300">Make source public</span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={createMutation.isPending}
          disabled={!title.trim() || !text.trim() || createMutation.isPending}
          className="mt-4"
        >
          Analyze text
        </Button>
      </form>
    </Card>
  )
}

export default TextAnalyzer
