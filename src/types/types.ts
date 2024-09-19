interface Item {
    group: number
    item: string
    quantity: number
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
