<script setup lang="ts">
import FooterArea from '@/components/FooterArea.vue';
import ArticlePreview from '@/components/ArticlePreview.vue';

import { type Author } from '../types/users';
import { type Article } from '../types/article';

const articleData: { [key: string]: { [key: number]: Article } } = {
  frankfurt: [
    {
      id: 1,
      author: 'Heinz Stein',
      title: 'Bahnbabo wird Bürgerbabo!',
      preview_img: 'https://taz.de/picture/5726693/948/30806361-1.jpg',
      date: '2023-05-11',
      text: 'Der Bahnbabo von Frankfurt wurde am 05.03.2023 zum Oberbürgermeister von Frankfurt gekrönt.'
    },
    {
      id: 2,
      author: 'Heinz Stein',
      title: 'Bahnbabo wird Bürgerbabo!',
      preview_img: 'https://taz.de/picture/5726693/948/30806361-1.jpg',
      date: '2023-05-11',
      text: 'Der Bahnbabo von Frankfurt wurde am 05.03.2023 zum Oberbürgermeister von Frankfurt gekrönt.'
    }
  ],
  wirtschaft: [

  ],
  usa: [

  ],
  international: [

  ]
};

const newestArticleData: { [key: number]: Article } = [

]

const teamData: { [key: string]: Author } = {
  norbertLarson: {
    name: 'Norbert Larson',
    job: 'Redaktionsleiter für Umwelt und Natur',
    img: 'https://frankfurtdynamics.github.io/frankfurt-times/NorbertLarson.jpg',
    about: 'Ich habe an keiner Uni Studiert bin aber ein Experte und sehe mich als Wissenschaftler. Ich lebe seit 7 Jahren im Wald und kenne mich daher sehr gut mit der Natur aus. Für diese Zeitung arbeite ich seitdem ich all meine Zähne verloren habe, als ich zu stark an einbem Baum kaute. Meine Hobbies sind Bäume anschauen und Wanderer erschrecken.'
  },
  heinzStein: {
    name: 'Heinz Stein',
    job: 'Reporter für Digitalisierung und IT Sicherheit',
    img: 'https://frankfurtdynamics.github.io/frankfurt-times/HeinzStein.png',
    about: ' Hallo, bin ich Online? Ja, ok. Mein Name ist Heinz ich habe 1982 mein Informatik Studium abgebrochen, und habe danach bis 2020 als IT Berater für die Bundesregierung gearbeitet. Ich bin wirklich gut mit moderner Technik, ich habe sogar mal ein Fax-Gerät benutzt.'
  }
};
</script>

<script lang="ts">
export default {
  data() {
    return {
      tab: "newest",
      show_drawer: false,
      article: null || String() || Number(),
    };
  },
  methods: {
    redirectToHome() {
      window.location.href = "/";
    },
    openArcticle(id: string) {
      this.article = id;
      this.tab = 'article';
    }
  },
};
</script>

<template>
  <v-app>
    <header>
      <v-app-bar :elevation="2" location="top" height="80px" color="background">
        <v-app-bar-title @click="redirectToHome">
          <img src="/favicon.png" />
        </v-app-bar-title>
        <h1 @click="redirectToHome">Frankfurt Times</h1>
        <v-app-bar-nav-icon @click="show_drawer = !show_drawer"></v-app-bar-nav-icon>
      </v-app-bar>

      <v-navigation-drawer v-model="show_drawer" location="right">
        <v-list density="comfortable">
          <v-list-item lines="one" @click="tab = 'newest'" height="50px" variant="flat" append-icon="mdi-newspaper" ripple
            color="primary" density="comfortable">
            Neuste
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'frankfurt'" height="50px" variant="flat" append-icon="mdi-map-marker"
            ripple color="primary" density="comfortable">
            Frankfurt
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'wirtschaft'" height="50px" variant="flat" append-icon="mdi-chart-line"
            ripple color="primary" density="comfortable">
            Wirtschaft
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'usa'" height="50px" variant="flat" append-icon="mdi-flag-variant" ripple
            color="primary" density="comfortable">
            USA
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'international'" height="50px" variant="flat" append-icon="mdi-earth"
            ripple color="primary" density="comfortable">
            International
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'team'" height="50px" variant="flat" append-icon="mdi-account-supervisor"
            ripple color="primary" density="comfortable">
            Redaktion
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-tabs v-model="tab" fixed-tabs height="40px" align-tabs="center" center-active density="compact"
        next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left" show-arrows>
        <v-tab value="newest"> Neuste </v-tab>

        <v-tab value="frankfurt"> Frankfurt </v-tab>

        <v-tab value="wirtschaft"> Wirtschaft </v-tab>

        <v-tab value="usa"> USA </v-tab>

        <v-tab value="international"> International </v-tab>
      </v-tabs>
    </header>

    <v-main>
      <v-window v-model="tab">
        <v-window-item value="newest">
          <v-list color="background" bg-color="background">
            <v-list-item color="background" v-bind:key="arcticle.id" ripple v-for="arcticle in newestArticleData">
              <ArticlePreview @openArticle="openArcticle" :date="arcticle.date" :id="arcticle.id" :title="arcticle.title"
                :preview_img="arcticle.preview_img" :author="arcticle.author"
                :preview_text="arcticle.text.substring(0, 50) + '...'" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="frankfurt">
          <v-list color="background" bg-color="background">
            <v-list-item color="background" v-bind:key="arcticle.id" ripple v-for="arcticle in articleData.frankfurt">
              <ArticlePreview @openArticle="openArcticle" :date="arcticle.date" :id="arcticle.id" :title="arcticle.title"
                :preview_img="arcticle.preview_img" :author="arcticle.author"
                :preview_text="arcticle.text.substring(0, 50) + '...'" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="wirtschaft">
          <v-list color="background" bg-color="background">
            <v-list-item color="background" v-bind:key="arcticle.id" ripple v-for="arcticle in articleData.wirtschaft">
              <ArticlePreview @openArticle="openArcticle" :date="arcticle.date" :id="arcticle.id" :title="arcticle.title"
                :preview_img="arcticle.preview_img" :author="arcticle.author"
                :preview_text="arcticle.text.substring(0, 50) + '...'" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="usa">
          <v-list color="background" bg-color="background">
            <v-list-item color="background" v-bind:key="arcticle.id" ripple v-for="arcticle in articleData.usa">
              <ArticlePreview @openArticle="openArcticle" :date="arcticle.date" :id="arcticle.id" :title="arcticle.title"
                :preview_img="arcticle.preview_img" :author="arcticle.author"
                :preview_text="arcticle.text.substring(0, 50) + '...'" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="international">
          <v-list color="background" bg-color="background">
            <v-list-item color="background" v-bind:key="arcticle.id" ripple v-for="arcticle in articleData.international">
              <ArticlePreview @openArticle="openArcticle" :date="arcticle.date" :id="arcticle.id" :title="arcticle.title"
                :preview_img="arcticle.preview_img" :author="arcticle.author"
                :preview_text="arcticle.text.substring(0, 50) + '...'" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="article">
          <h1>
            {{ article }}
          </h1>
        </v-window-item>

        <v-window-item value="team">
          <v-container fluid>
            <v-row dense :style="{ gap: '40px' }">
              <v-card color="secondary" width="400" v-bind:key="teamMember.name.toString()"
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
        </v-window-item>
      </v-window>
    </v-main>
  </v-app>

  <FooterArea />
</template>

<style scoped>
header {
  width: 100%;
  height: 120px;
}

.v-navigation-drawer .v-list {
  margin-top: 120px;
}

.v-navigation-drawer .v-list .v-list-item {
  margin-bottom: 10px;
}

header h1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
}

.v-tabs {
  top: 80px;
  z-index: 1008;
  position: fixed;
  width: 100%;
}

.v-app-bar-title {
  width: 60px;
}

header img {
  height: 60px;
  width: auto;
  border: 4px solid #fff;
}

.v-app-bar-title * {
  display: flex;
  align-content: center;
  justify-content: flex-start;
}

@media screen and (max-width: 500px) {
  header img {
    height: 50px;
    min-height: auto;
    width: 50px;
  }

  header {
    height: 100px;
  }

  .v-navigation-drawer .v-list {
    margin-top: 100px;
  }

  .v-main {
    min-height: calc(100vh - 100px);
  }

  .v-tabs {
    top: 60px;
  }

  header h1 {
    width: auto;
  }
}

@media screen and (max-width: 450px) {
  header h1 {
    font-size: 20px;
  }
}

@media screen and (max-width: 300px) {
  header h1 {
    display: none;
  }

  .v-tabs {
    display: none;
  }

  header {
    height: 60px;
  }

  .v-navigation-drawer .v-list {
    margin-top: 60px;
  }
}
</style>
