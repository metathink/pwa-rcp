export interface Item {
    group: string
    item: string
    quantity: string
}

export interface Procedure {
    procedureImage: string
    procedureStr: string
}

export interface Post {
    id?: number
    title: string
    thumbnail?: Blob | null
    description: string
    createdAt: Date
    editedAt?: Date
    items?: Item[]
    referenceUrls?: string[]
    procedure?: Procedure[]
}
