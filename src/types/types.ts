export interface Item {
    group: string
    item: string
    quantity: string
}

export interface Post {
    id?: number
    title: string
    description: string
    createdAt: Date
    editedAt?: Date
    items?: Item[]
    referenceUrls?: string[]
    procedure?: string[]
}
