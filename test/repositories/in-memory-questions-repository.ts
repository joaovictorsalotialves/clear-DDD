import { DomainEvents } from '@/core/events/domain-events'
import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import type { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}

  async findById(id: string) {
    return this.items.find(item => item.id.toString() === id) ?? null
  }

  async findBySlug(slug: string) {
    return this.items.find(item => item.slug.value === slug) ?? null
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(question: Question) {
    this.items.push(question)

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items[itemIndex] = question

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items.splice(itemIndex, 1)

    await this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString()
    )
  }
}
