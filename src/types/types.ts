interface Item {
    group: number
    name: string
}

export interface Post {
    id?: number
    title: string
    description: string
    createdAt: Date
    editedAd?: Date
    items?: Item[]
    referenceUrl?: string[]
}
