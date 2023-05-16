<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        preview_img: {
            type: String,
            required: false
        },
        preview_text: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    methods: {
        openArticle() {
            window.location.href = this.url || window.location.href;
        }
    }
};
</script>

<template>
    <v-card color="background" @click="openArticle()" density="compact" border="0" flat exact elevation="0"
        class="custom-card">
        <v-img :src="preview_img"></v-img>
        <section>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-subtitle>
                <p>{{ date }}</p>
            </v-card-subtitle>
            <v-card-text class="text">{{ preview_text }}</v-card-text>
        </section>
    </v-card>
</template>
  
<style scoped>
.v-card {
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    height: 160px;
}

.v-card-title {
    margin-bottom: 0px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
}

.v-card-subtitle {
    margin-top: -12px;
    font-size: 14px;
    margin-bottom: 0;
}

.v-img {
    width: 20%;
    max-height: 100%;
}

section {
    display: flex;
    height: 100%;
    flex-direction: column;
    width: 75%;
    box-sizing: border-box;
    padding-left: 20px;
    padding-top: 0px;
    gap: 5px;
}

.text {
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: -10px;
}
</style>
  