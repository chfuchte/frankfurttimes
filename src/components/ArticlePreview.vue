<script lang="ts">
import { renderText } from './renderText';

export default {
    props: {
        title: String,
        preview_img: String || undefined,
        preview_text: String,
        date: String,
        url: String
    },
    data() {
        return {
            heigth: '250px',
            width: 'auto',
            maxWidth: '400px'
        }
    },
    created() {
        if (window.innerWidth <= 600) {
            this.heigth = '';
            this.width = '100%';
            this.maxWidth = '600px';
        }
    },
    methods: {
        openArticle() {
            window.location.href = this.url ?? window.location.href;
        },
        renderText
    }
}
</script>

<template>
    <v-card color="background" @click="openArticle()" density="compact" border="0" elevation="0">
        <v-divider color="surface" thickness="2"></v-divider>
        <v-row>
            <v-col v-show="preview_img != undefined" cols="12" sm="4"
                :style="{ maxWidth: maxWidth, display: 'inline-flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }">
                <v-img :height="heigth" :width="width" :src="preview_img" cover />
            </v-col>
            <v-col cols="12" sm="8">
                <v-card-title class="headline">{{ title }}</v-card-title>
                <v-card-subtitle class="metadata">
                    <p> {{ date }} </p>
                </v-card-subtitle>
                <v-card-text class="preview-text" :v-html="renderText(preview_text ?? '')"></v-card-text>
            </v-col>
        </v-row>
        <v-divider color="surface" thickness="2"></v-divider>
    </v-card>
</template>

<style scoped>
.v-card {
    margin: 20px 5px;
}

.article-preview {
    cursor: pointer;
    margin-bottom: 20px;
}

.headline {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
}

.metadata {
    font-size: 14px;
}

.preview-text {
    font-size: 16px;
    line-height: 1.5;
}
</style>