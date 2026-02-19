import React from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import api from 'src/lib/axios'
import { BaseLayout } from 'src/features/shared/components/BaseLayout'
import { Button, Card } from 'src/features/shared/components/ui'
import { useTerms } from 'src/features/terms/api/getTerms'
import type { Term } from 'src/features/terms/types'

const PRACTICE_SIZE = 20

const PracticePage: React.FC = () => {
  const { id } = useParams()
  const sourceId = Number(id)
  const [words, setWords] = React.useState<Term[]>([])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isFlipped, setIsFlipped] = React.useState(false)

  const {
    data: termsResponse,
    isLoading,
    error,
    refetch,
  } = useTerms({
    sourceId,
    learnt: false,
    perPage: PRACTICE_SIZE,
    page: 1,
  })

  React.useEffect(() => {
    if (!termsResponse?.data) return

    setWords(termsResponse.data)
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [termsResponse])

  const nextWord = React.useCallback(() => {
    setCurrentIndex((index) => {
      if (index >= words.length - 1) return words.length
      return index + 1
    })
    setIsFlipped(false)
  }, [words.length])

  const previousWord = React.useCallback(() => {
    setCurrentIndex((index) => {
      if (index <= 0) return 0
      return index - 1
    })
    setIsFlipped(false)
  }, [])

  const activeWord = words[currentIndex]
  const isComplete = words.length === 0 || currentIndex >= words.length

  const updateCurrentWordLearnt = React.useCallback((learnt: boolean) => {
    setWords((currentWords) =>
      currentWords.map((word, index) => {
        if (index !== currentIndex) return word

        return {
          ...word,
          learnt,
        }
      })
    )
  }, [currentIndex])

  const setLearntMutation = useMutation({
    mutationFn: ({ id, learnt }: { id: number; learnt: boolean }) =>
      api.patch(`/api/v1/terms/${id}`, { term: { learnt } }),
    onError: () => {
      toast.error('Could not update learnt status')
    },
  })

  const setActiveWordLearnt = React.useCallback(async (learnt: boolean) => {
    if (!activeWord) return
    await setLearntMutation.mutateAsync({ id: activeWord.id, learnt })
    updateCurrentWordLearnt(learnt)
  }, [activeWord, setLearntMutation, updateCurrentWordLearnt])

  const handleToggleLearnt = React.useCallback(async () => {
    if (!activeWord) return
    await setActiveWordLearnt(!activeWord.learnt)
  }, [activeWord, setActiveWordLearnt])

  const handleMarkLearnt = React.useCallback(async () => {
    if (!activeWord?.learnt) await setActiveWordLearnt(true)
  }, [activeWord, setActiveWordLearnt])

  const handleMarkUnlearned = React.useCallback(async () => {
    if (activeWord?.learnt) await setActiveWordLearnt(false)
  }, [activeWord, setActiveWordLearnt])

  const handlePracticeAgain = React.useCallback(async () => {
    await refetch()
    setCurrentIndex(0)
    setIsFlipped(false)
  }, [refetch])

  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (isLoading || isComplete || setLearntMutation.isPending) return

      if (event.code === 'Space') {
        event.preventDefault()
        setIsFlipped((current) => !current)
      }

      if (event.code === 'Enter') {
        event.preventDefault()
        handleToggleLearnt()
      }

      if (event.code === 'ArrowRight') {
        event.preventDefault()
        nextWord()
      }

      if (event.code === 'ArrowLeft') {
        event.preventDefault()
        previousWord()
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [isLoading, isComplete, setLearntMutation.isPending, handleToggleLearnt, nextWord, previousWord])

  const learntCount = words.filter((word) => !!word.learnt).length
  const progressLabel = isComplete ? 'Session Complete' : `${currentIndex + 1} / ${words.length}`
  const isActiveWordLearnt = !!activeWord?.learnt

  return (
    <BaseLayout title="Practice Mode" isLoading={isLoading}>
      {error && (
        <Card className="border-red-500/40 bg-red-500/5">
          <p className="text-red-500">Could not load terms for practice.</p>
        </Card>
      )}

      {!error && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <span>Source: {sourceId}</span>
            <span>{progressLabel}</span>
          </div>

          {!isComplete && (
            <div className="flex items-center justify-end">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Learned this session: {learntCount}/{words.length}
              </span>
            </div>
          )}

          <Card padding="lg" className="min-h-[420px] flex flex-col justify-center items-center text-center">
            {isComplete ? (
              <div className="space-y-6">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">Session Complete</h2>
                <p className="text-slate-500 dark:text-slate-400">Practice finished for this set of words.</p>
                <Button onClick={handlePracticeAgain} variant="primary">Practice Again</Button>
              </div>
            ) : (
              <div className="space-y-8 w-full max-w-2xl">
                <div className="flex items-center justify-center">
                  <span
                    className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${isActiveWordLearnt
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/40'
                      : 'bg-slate-500/10 text-slate-600 dark:text-slate-300 border-slate-400/30'}`}
                  >
                    {isActiveWordLearnt ? 'Learned' : 'Unlearned'}
                  </span>
                </div>

                <p className="text-5xl md:text-6xl font-black italic uppercase tracking-tight break-words">{activeWord?.phrase}</p>

                {isFlipped ? (
                  <div className="space-y-4 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/30 dark:bg-black/20 p-6">
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-500 dark:text-slate-400">Meaning</p>
                      <p className="text-2xl font-bold">{activeWord?.meaning || 'No meaning available'}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">Press Space to reveal meaning.</p>
                )}
              </div>
            )}
          </Card>

          {!isComplete && (
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" onClick={() => setIsFlipped((current) => !current)}>Flip (Space)</Button>
              <Button variant="glass" onClick={previousWord}>Previous (←)</Button>
              <Button variant="glass" onClick={nextWord}>Next (→)</Button>
              {isActiveWordLearnt ? (
                <Button variant="outline" isLoading={setLearntMutation.isPending} onClick={handleMarkUnlearned}>Mark Unlearned (Enter)</Button>
              ) : (
                <Button variant="primary" isLoading={setLearntMutation.isPending} onClick={handleMarkLearnt}>I Learned (Enter)</Button>
              )}
            </div>
          )}
        </div>
      )}
    </BaseLayout>
  )
}

export default PracticePage
