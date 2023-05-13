<script lang="ts">
import LinkHeaderArea from '@/components/LinkHeaderArea.vue';
import FooterArea from '@/components/FooterArea.vue';
import { type Author } from '@/types/users';
import { ref } from 'vue';

export default {
    components: {
        LinkHeaderArea,
        FooterArea
    },
    mounted() {
        fetch('/teamData.json').then((res: Response) => res.json()).then((data: { [key: string]: Author }) => {
            this.teamData = data;
        });
    },
    data() {
        return {
            teamData: ref<Record<string, Author>>({}),
        }
    }
}
</script>

<template>
    <v-app>
        <LinkHeaderArea />

        <v-main :style="{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }">
            <v-container fluid>
                <v-row dense :style="{ gap: '40px', justifyContent: 'center' }">
                    <v-card color="primary" width="400" v-bind:key="teamMember.name.toString()"
                        v-for="teamMember in teamData">
                        <v-img width="400" aspect-ratio="1/1" :src="teamMember.img.toString()" />
                        <v-card-title>
                            {{ teamMember.name }}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ teamMember.job }}
                        </v-card-subtitle>

                        <v-card-text>
                            {{ teamMember.about }}
                        </v-card-text>
                    </v-card>
                </v-row>
            </v-container>
        </v-main>
    </v-app>

    <FooterArea />
</template>

<style scoped></style>
