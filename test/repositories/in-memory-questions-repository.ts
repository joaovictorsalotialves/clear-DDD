import type { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  public itens: Question[] = []

  async findBySlug(slug: string) {
    return this.itens.find(item => item.slug.value === slug) ?? null
  }

  async create(question: Question) {
    this.itens.push(question)
  }
}
