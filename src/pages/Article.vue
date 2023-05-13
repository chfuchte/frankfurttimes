<script lang="ts">
import LinkHeaderArea from '@/components/LinkHeaderArea.vue';
import FooterArea from '@/components/FooterArea.vue';
import { type Article, type ArticlePart } from '@/types/article'

export default {
    components: {
        LinkHeaderArea,
        FooterArea,
    },
    beforeMount() {
        let articles: Record<string, Article[]>;

        fetch('/articleData.json').then((res: Response) => res.json()).then((data: Record<string, Article[]>) => {
            articles = data;
            // Überprüfe, ob Suchparameter vorhanden sind
            const params = new URLSearchParams(window.location.search);
            const articleId: string = params.get('id') ?? '';
            const folder: string = params.get('t') ?? '';

            if (articleId && folder && articles) {
                if (articles[folder] != undefined && articles[folder][parseInt(articleId)] != undefined) {
                    let article: Article = articles[folder][parseInt(articleId)];

                    if (article && article.title && article.url && article.author && article.date && article.content) {
                        this.title = article.title;
                        this.url = article.url;
                        this.author = article.author;
                        this.date = article.date;
                        this.img = article.img ?? undefined;
                        this.content = article.content;
                    } else {
                        this.isError = true;
                        this.error = 'Der Artikel konnte nicht gefunden oder nicht geladen werden.'
                    }
                } else {
                    this.isError = true;
                    this.error = 'Der Artikel konnte nicht gefunden oder nicht geladen werden.'
                }
            } else {
                this.isError = true;
                this.error = 'Der Artikel konnte nicht gefunden oder nicht geladen werden.'
            }
        }).catch(() => {
            this.isError = true;
            this.error = 'Der Artikel konnte nicht gefunden oder nicht geladen werden.'
        });
    },
    created() {
        if (window.innerWidth <= 700) {
            this.width = '100%'
        }
    },
    methods: {
        async share() {
            try {
                await navigator.clipboard.writeText(this.url);
            } catch (err: Error | any) {
                this.isError = true;
                this.error = err.toString();
            }
        }
    },
    data() {
        return {
            title: '',
            url: '',
            author: '',
            date: '',
            img: String() || undefined,

            content: Array<ArticlePart>(),

            isError: false,
            error: '',
            width: '75%'
        }
    },
}
</script>

<template>
    <v-app>
        <LinkHeaderArea />

        <v-main :style="{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '100vh' }">
            <v-card :width="width" height="auto" color="background" border="0" elevation="3" style="padding-bottom: 100px;">
                <v-img :src="img" v-if="img" cover />

                <v-card-title>
                    <h1>{{ title }}</h1>
                </v-card-title>

                <v-alert closable title="Ein Fehler ist aufgetreten" :text="error" type="error" variant="tonal"
                    v-if="isError" />

                <v-divider color="primary" thickness="2"></v-divider>

                <v-card-subtitle>
                    <v-row>
                        <v-column>
                            <i>{{ date }}</i> <br>
                            <b>{{ author }}</b>
                        </v-column>
                        <v-card-actions>
                            <v-btn icon="mdi-share" @click="share()" />
                        </v-card-actions>
                    </v-row>
                </v-card-subtitle>

                <v-card-text>
                    <v-row>
                        <!-- todo -->
                    </v-row>
                </v-card-text>
            </v-card>
        </v-main>
    </v-app>

    <FooterArea />
</template>

<style scoped></style>
