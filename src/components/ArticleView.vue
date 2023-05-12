<script lang="ts">
export default {
    props: {
        title: String,
        preview_img: String,
        author: String,
        text: String,
        date: String
    }
}
</script>

<template>
    <v-card width="75%" height="auto" color="background" border="0" elevation="3" style="padding-bottom: 100px;">
        <v-img :src="preview_img" cover />

        <v-card-title>
            <h1>{{ title }}</h1>
        </v-card-title>

        <v-divider color="primary" thickness="2"></v-divider>

        <v-card-subtitle>
            <i>{{ date }}</i> <br>
            <b>{{ author }}</b>
        </v-card-subtitle>

        <v-divider></v-divider>

        <v-card-text>
            {{ text }}
        </v-card-text>
    </v-card>
</template>

<style scoped></style>