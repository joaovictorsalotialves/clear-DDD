import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    return this.items.find(item => item.id.toString() === id) ?? null
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      item => item.id === questionComment.id
    )

    this.items.splice(itemIndex, 1)
  }
}
