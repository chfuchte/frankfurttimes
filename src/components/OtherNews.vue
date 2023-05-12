<script lang="ts">
export default {
    props: {
        width: String
    },
    data() {
        return {
            title: '',
            text: '',
            url: '',
            img: '',
            date: ''
        }
    },
    beforeMount() {
        fetch('/brakingNews.json').then(res => res.json()).then((data: {
            title: string,
            text: string,
            url: string,
            img: string,
            date: string
        }) => {
            if (data) {
                this.title = data.title;
                this.text = data.text;
                this.url = data.url;
                this.img = data.img;
                this.date = data.date;
            }
        });
    }
}
</script>

<template>
    <v-card :href="url" :width="width" border="4" elevation="0.5" color="background" density="comfortable" height="75%">
        <v-img cover :src="img" width="100%" style="max-height: 250px" />
        
        <v-card-title>
            <h3>
                {{ title }}
            </h3>
        </v-card-title>

        <v-card-subtitle>
            {{ data }}
        </v-card-subtitle>

        <v-card-text>
            {{ text }}
        </v-card-text>
    </v-card>
</template>

<style scoped>
.v-card {
    margin: 20px;
    margin-top: 40px;
}
</style>