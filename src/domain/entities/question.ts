import { Entity } from '../../core/entities/entities'
import type { UniqueEntityID } from '../../core/entities/unique-entity-id'
import type { Optional } from '../../core/types/optional'

interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId: UniqueEntityID
  title: string
  slug: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityID
  ) {
    const question = new Question({ ...props, createdAt: new Date() }, id)

    return question
  }
}
