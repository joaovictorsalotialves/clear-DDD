import type { QuestionComment } from '../../enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComment: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questioncommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComment =
      await this.questioncommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComment }
  }
}
