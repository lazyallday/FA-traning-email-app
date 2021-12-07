import message from '../assets/messages.json';

interface IMessage {
    folder: string
    body: string
    subject: string
    from: string
    to: string
    date: string
    senderName: {
        last: string
        first: string
    }
    corpus: string
    _id: string
}

export function getFolder(messageData: IMessage[], user: string) {
    const folders = messageData.filter(item => item.to === user).map(item => item.folder)
    const folderSet = new Set(folders)
    return [...folderSet]
}

export function getUser() {
    const users = message.map(item => item.to)
    const userSet = new Set(users)
    return [...userSet]
}

export function getMessByFolder(folder: string, user: string): IMessage[] {
    return message.filter(item => item.folder === folder && item.to === user)
}

export function getMessById(id: string): IMessage {
    return message.find(item => item._id === id) as IMessage
}

export function formatDate(d: string) {
    return new Date(d).toISOString().slice(0, 10)
}
