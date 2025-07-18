import { type Either, right } from '@/core/either'
import type { AnswerComment } from '../../enterprise/entities/answer-comment'
import type { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComment: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answercommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComment = await this.answercommentRepository.findManyByAnswerId(
      answerId,
      {
        page,
      }
    )

    return right({ answerComment })
  }
}
