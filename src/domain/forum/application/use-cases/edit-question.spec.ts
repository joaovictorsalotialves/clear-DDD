import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    sut = new EditQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionAttachmentsRepository
    )
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
        title: 'Title',
        content: 'Content',
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID(`attachment-1`),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID(`attachment-2`),
      })
    )

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'New Title',
      content: 'New Content',
      attachmentsIds: ['attachment-1', 'attachment-3'],
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'New Title',
      content: 'New Content',
    })
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems
    ).toHaveLength(2)
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems
    ).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityID('attachment-1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityID('attachment-3'),
      }),
    ])
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
        title: 'Title',
        content: 'Content',
      },
      new UniqueEntityID('question-1')
    )

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
      title: 'New Title',
      content: 'New Content',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
