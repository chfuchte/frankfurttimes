<script lang="ts">
import FooterArea from '@/components/FooterArea.vue'
import LinkHeaderArea from '@/components/LinkHeaderArea.vue'
import { type ArticlePart, type Article } from '@/types/article'
import { renderText } from '@/components/renderText';

export default {
    components: { FooterArea, LinkHeaderArea },
    data() {
        return {
            tab: 'edit',
            width: '75%',
            title: '',
            img: '',
            date: '',
            author: '',
            url: '',
            preview_text: '',
            content: Array<ArticlePart>(),

            output: ''
        }
    },
    created() {
        if (window.innerWidth <= 700) {
            this.width = '100%'
        }
    },
    methods: {
        renderText,
        addText() {
            // todo
        },
        addCarousel() {
            // todo
        },
        addSources() {
            // todo
        },
        build() {
            let output: Article = {
                title: this.title,
                date: this.date,
                img: this.img,
                author: this.author,
                preview_text: this.preview_text,
                url: this.url,
                content: this.content,
            };

            // ? todo
            this.output = JSON.stringify(output).toString();
            this.tab = 'output';
        }
    }
}
</script>

<template>
    <v-app>
        <LinkHeaderArea />

        <v-main :style="{ width: '100%' }">
            <v-tabs align-tabs="center" fixed-tabs center-active color="background" bg-color="info" v-model="tab">
                <v-tab value="edit">
                    Edit
                </v-tab>
            </v-tabs>
            <v-window :style="{ width: '100%', minHeight: '100vh' }" v-model="tab">
                <v-window-item value="edit" style="width: 100%; height: 100%;">
                    <v-card :width="width" height="auto" color="background" border="0" elevation="3"
                        style="padding-bottom: 20px;">
                        <v-img :src="img" v-if="img" style="max-height: 40vh;" />

                        <v-card-title style="margin-top: 20px; flex-direction: column; display: flex;">
                            <v-text-field v-model="img" variant="underlined" placeholder="Bild" />
                            <v-text-field v-model="title" variant="underlined" placeholder="Titel" />
                        </v-card-title>

                        <v-divider color="primary" thickness="2"></v-divider>

                        <v-card-title
                            style="width: 100%; flex-direction: column, display: inline-flex; align-items: center; justify-content: space-between;">
                            <v-text-field v-model="date" placeholder="Datum" variant="underlined" />
                            <v-text-field v-model="author" placeholder="Autor" variant="underlined" />
                        </v-card-title>

                        <v-divider color="primary" thickness="1"></v-divider>

                        <v-card-text>
                            <v-container>
                                <v-row style="margin-bottom: 2em;" v-bind:key="index" v-for="(c, index) in content">
                                    <article v-if="c.type == 'plain'">
                                        <p v-html="renderText(c.text ?? '')"></p>
                                    </article>

                                    <v-carousel v-if="c.type == 'carousel'">
                                        <v-carousel-item v-bind:key="index" v-for="(img_src, index) in c.carousel_srcs "
                                            :src="img_src"
                                            :alt="c.carousel_alts ? c.carousel_alts[index] : ''"></v-carousel-item>
                                    </v-carousel>

                                    <article style="display: flex; flex-direction: row; width: 100%; gap:10px;"
                                        v-if="c.type == 'src'">
                                        <a :href="src" v-for="(src, index) in c.srcs" v-bind:key="index">
                                            {{ src }}
                                        </a>
                                    </article>
                                </v-row>
                            </v-container>

                            <v-btn-group>
                                <v-btn @click="addText()">
                                    add Text
                                </v-btn>

                                <v-btn @click="addCarousel()">
                                    add Carousel
                                </v-btn>

                                <v-btn @click="addSources()">
                                    add Sources
                                </v-btn>
                            </v-btn-group>

                            <v-text-field v-model="url" variant="underlined" placeholder="URL"
                                hint="/article.html?t=TAB&id=ID" />
                            <v-text-field v-model="preview_text" variant="underlined" placeholder="Preview Text"
                                hint="Kurzer Text des Artikels als Preview" />
                        </v-card-text>

                        <v-card-actions
                            style="display: inline-flex; align-items: end; justify-content: center; flex-direction: row; width: 100%;">
                            <v-btn variant="outlined" color="info" @click="build()">
                                Fertigstellen
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-window-item>

                <v-window-item value="output">
                    <v-card :width="width" height="auto" color="background" border="0" elevation="3"
                        style="padding-bottom: 20px;">
                        <v-card-title>
                            Output
                        </v-card-title>

                        <v-card-text>
                            <v-divider></v-divider>

                            {{ output }}

                            <v-divider></v-divider>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions
                            style="display: inline-flex; align-items: end; justify-content: center; flex-direction: row; width: 100%;">
                            <v-btn variant="outlined" color="info" @click="tab = 'edit'">
                                Zurück
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-window-item>
            </v-window>
        </v-main>
    </v-app>

    <FooterArea />
</template>

<style scoped>
.v-window__container {
    width: 100% !important;
}

.v-window-item {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
</style>
