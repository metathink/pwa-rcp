interface Item {
    group: number
    name: string
}

export interface Post {
    id: number
    title: string
    description: string
    createdAt: Date
    editedAt: Date
    items: Item[]
    tags: string[]
    referenceUrl: string[]
}
