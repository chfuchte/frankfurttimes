interface Article {
    title: string,
    url: string,
    author: string,
    date: string,
    img?: string,
    content: ArticlePart[],
    preview_img?: string,
    preview_text: string
}

// plain = default Text
// title_img = big image
// carousel = an array of img_src for a v-carousel
// src = a list of srces used in this article
type ArticlePartType = "plain" | "title_img" | "carousel" | "src"

interface ArticlePart {
    type: ArticlePartType,
    
    // for type = "plain"
    text?: string,

    // for type = "title_img"
    title_src?: string,
    title_alt?: string

    // for type = "carousel"
    carousel_srcs?: string[],
    carousel_alts?: string[],

    // for type = "src"
    srcs?: string[]
}

export type {
    Article,
    ArticlePart
}
