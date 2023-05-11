<script lang="ts">
export default {
    props: {
        id: Number,
        title: String,
        preview_img: String,
        author: String,
        preview_text: String,
        date: String,
        text: String
    },
    data() {
        return {
            heigth: '150px',
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
            this.$emit('openArticle', {
                id: this.id,
                title: this.title,
                preview_img: this.preview_img,
                author: this.author,
                preview_text: this.preview_text,
                date: this.date,
                text: this.text
            });
        }
    }
}
</script>

<template>
    <v-card color="primary" class="article-preview" @click="openArticle()" density="compact">
        <v-row no-gutters>
            <v-col cols="12" sm="4"
                :style="{ maxWidth: maxWidth, display: 'inline-flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }">
                <v-img :height="heigth" :width="width" :src="preview_img" cover />
            </v-col>
            <v-col cols="12" sm="8">
                <v-card-title class="headline">{{ title }}</v-card-title>
                <v-card-subtitle class="metadata">
                    <span>{{ author }}</span>
                    <span>{{ date }}</span>
                </v-card-subtitle>
                <v-card-text class="preview-text">{{ preview_text }}</v-card-text>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
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