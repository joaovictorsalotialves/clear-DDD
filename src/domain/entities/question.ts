import { randomUUID } from 'node:crypto'

interface QuestionProps {
  title: string
  slug: string
  content: string
  authorId: string
}

export class Question {
  public id: string
  public title: string
  public slug: string
  public content: string
  public authorId: string

  constructor(props: QuestionProps, id?: string) {
    this.title = props.title
    this.slug = props.slug
    this.content = props.content
    this.authorId = props.authorId
    this.id = id ?? randomUUID()
  }
}
