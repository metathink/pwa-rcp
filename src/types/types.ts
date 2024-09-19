interface Item {
    group: number
    item: string
}

export interface Post {
    id?: number
    title: string
    description: string
    createdAt: Date
    editedAd?: Date
    items?: Item[]
    referenceUrls?: string[]
}
