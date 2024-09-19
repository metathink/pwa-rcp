import { Post } from "../types/types"

const DB_NAME = 'rcpDatabase'
const DB_VERSION = 1
const STORE_NAME = 'rcpStore'

let dbInstance: IDBDatabase | null = null

const openDB = (): Promise<IDBDatabase> => {
    if (dbInstance) {
        return Promise.resolve(dbInstance)
    }

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = (event.target as IDBOpenDBRequest).result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true })
                objectStore.createIndex("title", "title", { unique: false })
                objectStore.createIndex("createdAt", "createdAt", { unique: false })
                objectStore.createIndex("tags", "tags", { unique: false, multiEntry: true })
                objectStore.createIndex("items", "items", { unique: false, multiEntry: true })
            }
        }

        request.onsuccess = () => {
            dbInstance = request.result
            resolve(dbInstance)
        }

        request.onerror = (event: Event) => {
            reject(`Error opening the database: ${(event.target as IDBRequest).error}`)
        }

    })
}

export const addPost = async (post: Post): Promise<void> => {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const request = store.add(post)

        request.onsuccess = () => {
            resolve()
        }

        request.onerror = (event: Event) => {
            reject(`Transaction failed: ${(event.target as IDBRequest).error}`)
        }
    })
}

export const getPostAll = async (): Promise<Post[]> => {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, "readonly")
    const store = transaction.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const results: Post[] = []
        const request = store.openCursor()

        request.onsuccess = (event: Event) => {
            const cursor = (event.target as IDBRequest).result as IDBCursorWithValue | null
            if (cursor) {
                results.push(cursor.value)
                cursor.continue()
            } else {
                resolve(results)
            }
        }

        request.onerror = (event: Event) => {
            reject(`Error retrieving all posts: ${(event.target as IDBRequest).error}`)
        }
    })
}

export const getPost = async (id: number): Promise<Post | undefined> => {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, "readonly")
    const store = transaction.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const request = store.get(id)

        request.onsuccess = () => {
            resolve(request.result as Post | undefined)
        }

        request.onerror = (event: Event) => {
            reject(`Error getting item: ${(event.target as IDBRequest).error}`)
        }
    })
}



export const updatePost = async (post: Post): Promise<void> => {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const request = store.put(post)

        request.onsuccess = () => {
            resolve()
        };

        request.onerror = (event: Event) => {
            reject(`Transaction failed: ${(event.target as IDBRequest).error}`)
        }
    })
}

export const deletePost = async (id: number): Promise<void> => {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const request = store.delete(id)

        request.onsuccess = () => {
            resolve()
        }

        request.onerror = (event: Event) => {
            reject(`Transaction failed: ${(event.target as IDBRequest).error}`)
        }
    })
}

export const deleteDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase(DB_NAME)

        request.onsuccess = () => {
            resolve()
        }

        request.onerror = (event: Event) => {
            reject(`Error deleting the database: ${(event.target as IDBRequest).error}`)
        }

        request.onblocked = () => {
            reject("Database deletion blocked.")
        }
    })
}

export const getByTitle = async (title: string): Promise<Post[]> => {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const index = store.index("title")

    return new Promise((resolve, reject) => {
        const results: Post[] = []
        const request = index.openCursor(IDBKeyRange.only(title))

        request.onsuccess = (event: Event) => {
            const cursor = (event.target as IDBRequest).result as IDBCursorWithValue | null
            if (cursor) {
                results.push(cursor.value)
                cursor.continue()
            } else {
                resolve(results)
            }
        }

        request.onerror = (event: Event) => {
            reject(`Error searching by title: ${(event.target as IDBRequest).error}`)
        }
    })
}

export const getByItem = async (itemValue: string): Promise<Post[]> => {
    const db = await openDB()
    const transaction = db.transaction(STORE_NAME, "readonly")
    const store = transaction.objectStore(STORE_NAME)
    const index = store.index("items")

    return new Promise((resolve, reject) => {
        const results: Post[] = []
        const request = index.openCursor(IDBKeyRange.only(itemValue))

        request.onsuccess = (event: Event) => {
            const cursor = (event.target as IDBRequest).result as IDBCursorWithValue | null
            if (cursor) {
                results.push(cursor.value)
                cursor.continue()
            } else {
                resolve(results)
            }
        }

        request.onerror = (event: Event) => {
            reject(`Error searching by item: ${(event.target as IDBRequest).error}`)
        }
    })
}