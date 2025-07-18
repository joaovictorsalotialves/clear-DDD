import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch question answers', async () => {
    for (let i = 1; i <= 3; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') })
      )
    }

    const result = await sut.execute({ questionId: 'question-1', page: 1 })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') })
      )
    }

    const result = await sut.execute({ questionId: 'question-1', page: 2 })

    expect(result.value?.answers).toHaveLength(2)
  })
})
