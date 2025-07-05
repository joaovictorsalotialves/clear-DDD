import type { Answer } from '../../enterprise/entities/answer'
import type { AnswerRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    return
  },
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova responsta',
  })

  expect(answer.content).toEqual('Nova responsta')
})
