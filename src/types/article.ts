interface Article {
    title: string,
    url: string,
    author: string,
    date: string,
    img: string,
    content: ArticlePart[],
    preview_text: string
}

// plain = default Text
type ArticlePartType = "plain"

interface ArticlePart {
    type: ArticlePartType,
    
    // for type = "plain"
    text?: string,
}

export type {
    Article,
    ArticlePart
}
