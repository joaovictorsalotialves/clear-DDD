import type { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  public itens: Question[] = []

  async create(question: Question) {
    this.itens.push(question)
  }
}
