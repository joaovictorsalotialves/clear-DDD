import { Entity } from '../../core/entities/entities'

interface QuestionProps {
  title: string
  slug: string
  content: string
  authorId: string
}

export class Question extends Entity<QuestionProps> {}
