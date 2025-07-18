import { type Either, left, right } from '@/core/either'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteCommentAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteCommentAnswerUseCaseResponse = Either<string, {}>

export class DeleteCommentAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      return left('Answer Comment not found.')
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
