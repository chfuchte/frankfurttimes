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
// title_img = big image
// carousel = an array of img_src for a v-carousel
// src = a list of srces used in this article
type ArticlePartType = "plain" | "carousel" | "src"

interface ArticlePart {
    type: ArticlePartType,
    
    // for type = "plain"
    text?: string,

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
