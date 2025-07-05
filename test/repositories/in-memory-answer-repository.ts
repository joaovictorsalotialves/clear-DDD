import type { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public itens: Answer[] = []

  async create(answer: Answer) {
    this.itens.push(answer)
  }
}
