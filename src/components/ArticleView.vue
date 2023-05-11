<script setup lang="ts">
import { teamData } from '@/assets/teamData';
</script>

<script lang="ts">
export default {
    props: {
        id: Number,
        title: String,
        preview_img: String,
        author: String,
        text: String,
        date: String
    }
}
</script>

<template>
    <v-card width="80%" height="80%">
        <v-img :src="preview_img" />

        <v-card-title>
            {{ title }}
        </v-card-title>

        <v-card-subtitle>
            {{ date }} <br>
            {{ author }}
        </v-card-subtitle>

        <v-card-text>
            {{ text }}
        </v-card-text>
    </v-card>
</template>

<style scoped></style>