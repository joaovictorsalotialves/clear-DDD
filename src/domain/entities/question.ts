import { Entity } from '../../core/entities/entities'
import type { UniqueEntityID } from '../../core/entities/unique-entity-id'

interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId: UniqueEntityID
  title: string
  slug: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {}
