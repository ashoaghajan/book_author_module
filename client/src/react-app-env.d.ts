
type Book = {
    name: string,
    genre: string,
    id: string,
    authorId: string,
    author: Author
    authorName: string
}

type Author = {
    name: string,
    id: string,
    age: number | string,
    books: Array<Book>
}
