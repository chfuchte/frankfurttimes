<script lang="ts">
export default {
    props: {
        id: Number,
        title: String,
        preview_img: String,
        author: String,
        preview_text: String,
        date: String
    },
    methods: {
        openArticle() {
            this.$emit('openArticle', this.id);
        }
    }
}
</script>

<template>
    <v-card class="article-preview" @click="openArticle()" density="compact">
        <v-row no-gutters>
            <v-col cols="12" sm="4">
                <v-img height="200px" :src="preview_img" aspect-ratio="1" />
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
    font-size: 18px;
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