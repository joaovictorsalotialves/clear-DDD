import type { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repositry'
import type { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async findById(id: string) {
    return this.items.find(item => item.id.toString() === id) ?? null
  }

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(item => item.id === notification.id)

    this.items[itemIndex] = notification
  }
}
