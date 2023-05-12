<script lang="ts">
export default {
    props: {
        title: String,
        preview_img: String,
        author: String,
        preview_text: String,
        date: String,
        text: String,
        url: String
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
            window.location.href = this.url ?? window.location.href;
        }
    }
}
</script>

<template>
    <v-card color="primary" class="article-preview" @click="openArticle()" density="compact" border="0" elevation="0" >
        <v-row no-gutters>
            <v-col cols="12" sm="4"
                :style="{ maxWidth: maxWidth, display: 'inline-flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }">
                <v-img :height="heigth" :width="width" :src="preview_img" cover />
            </v-col>
            <v-col cols="12" sm="8">
                <v-card-title class="headline">{{ title }}</v-card-title>
                <v-card-subtitle class="metadata">
                    <h4>{{ author }}</h4>
                    <p> {{ date }} </p>
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