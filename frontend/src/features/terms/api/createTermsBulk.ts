import api from 'src/lib/axios'
import type { SourceTerm } from 'src/features/sources/types'

export type BulkCreateTermInput = {
  phrase: string;
  meaning: string | null;
  sourceId: number;
}

export const createTermsBulk = (terms: BulkCreateTermInput[]): Promise<SourceTerm[]> => {
  return api.post('/api/v1/terms', { terms }).then((res) => res.data)
}
