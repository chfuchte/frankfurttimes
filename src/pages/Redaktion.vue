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
        fetch('https://raw.githubusercontent.com/FrankfurtDynamics/frankfurttimesarticle/master/teamData.json').then((res: Response) => res.json()).then((data: { [key: string]: Author }) => {
            this.teamData = data;
        }).catch(() => {
            this.error = "Fehler mein Laden der Artikel";
            this.isError = true;
        });
    },
    data() {
        return {
            teamData: ref<Record<string, Author>>({}),
            isError: false,
            error: '',
            width: window.innerWidth,
        }
    }
}
</script>

<template>
    <v-app>
        <LinkHeaderArea />

        <v-main :style="{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }">
            <v-container fluid>
                <v-dialog :width="width >= 700 ? '400px' : '80%'" v-model="isError" close-on-content-click>
                    <v-alert closable title="Ein Fehler ist aufgetreten" :text="error" type="error" variant="tonal"
                        v-if="isError" />
                </v-dialog>
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
