<script lang="ts">
import LinkHeaderArea from '@/components/LinkHeaderArea.vue';
import FooterArea from '@/components/FooterArea.vue';
import { type Article, type ArticlePart } from '@/types/article'
import { renderText } from '@/components/renderText';

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
                this.shared = true;
            } catch (err: Error | any) {
                this.isError = true;
                this.error = err.toString();
            }
        },
        renderText,
        async copyLink() {
            try {
                await navigator.clipboard.writeText(`${window.location.protocol}//${window.location.hostname}:${window.location.port}${this.url}`);
                this.shared = false;
            } catch (err: Error | any) {
                this.isError = true;
                this.error = err.toString();
            }
        },
        getURL() {
            return `${window.location.protocol}//${window.location.hostname}:${window.location.port}${this.url}`;
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
            width: '75%',
            shared: false
        }
    },
}
</script>

<template>
    <v-app>
        <LinkHeaderArea />

        <v-main :style="{ display: 'flex', justifyContent: 'center', width: '100%', minHeight: '100vh' }">
            <v-dialog :width="width == '75%' ? '400px' : '80%'" v-model="shared">
                <v-card color="surface">
                    <v-card-title
                        style=" width: 100%; display: inline-flex; align-items: center; justify-content: space-between">
                        Artikel Teilen
                        <v-icon icon="mdi-share" size="24px" end></v-icon>
                    </v-card-title>

                    <v-card-text>
                        <v-btn @click="copyLink()" title="Link kopieren" color="primary" elevation="0" border="0" icon="mdi-content-copy" />
                        <v-btn :href="'whatsapp://send?text=' + getURL()" title="Via WhatsApp teilen" color="primary" elevation="0" border="0" icon="mdi-whatsapp" />
                    </v-card-text>

                    <v-card-actions>
                        <v-btn @click="shared = false">Schließen</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog :width="width == '75%' ? '400px' : '80%'" v-model="isError" close-on-content-click>
                <v-alert closable title="Ein Fehler ist aufgetreten" :text="error" type="error" variant="tonal"
                    v-if="isError" />
            </v-dialog>

            <v-card :width="width" height="auto" color="background" border="0" elevation="3" style="padding-bottom: 100px;">
                <v-img :src="img" v-if="img" style="max-height: 40vh;" />

                <v-card-title style="margin-top: 20px;">
                    <h1>{{ title }}</h1>
                </v-card-title>

                <v-divider color="primary" thickness="2"></v-divider>

                <v-card-subtitle
                    style="width: 100%; display: inline-flex; align-items: center; justify-content: space-between;">
                    <div>
                        <i>{{ date }}</i> <br>
                        <b>{{ author }}</b>
                    </div>
                    <v-card-actions>
                        <v-btn icon="mdi-share" @click="share()" />
                    </v-card-actions>
                </v-card-subtitle>

                <v-divider color="primary" thickness="1"></v-divider>

                <v-card-text>
                    <v-container>
                        <v-row style="margin-bottom: 2em;" v-bind:key="index" v-for="(c, index) in content">
                            <article v-if="c.type == 'plain'">
                                <p v-html="renderText(c.text ?? '')"></p>
                            </article>

                            <v-carousel v-if="c.type == 'carousel'">
                                <v-carousel-item v-bind:key="index" v-for="(img_src, index) in c.carousel_srcs "
                                    :src="img_src" :alt="c.carousel_alts ? c.carousel_alts[index] : ''"></v-carousel-item>
                            </v-carousel>

                            <article style="display: flex; flex-direction: row; width: 100%; gap:10px;"
                                v-if="c.type == 'src'">
                                <a :href="src" v-for="(src, index) in c.srcs" v-bind:key="index">
                                    {{ src }}
                                </a>
                            </article>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-main>
    </v-app>

    <FooterArea />
</template>

<style scoped></style>
