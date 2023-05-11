<script setup lang="ts">
import FooterArea from '@/components/FooterArea.vue';
import ArticlePreview from '@/components/ArticlePreview.vue';
import ArticleView from '@/components/ArticleView.vue';
</script>

<script lang="ts">
import { type Article } from '@/types/article';
import { articleData } from '../assets/articleData';
import newestArticleData from '../assets/newestArticleData';
import { teamData } from '../assets/teamData';

export default {
  data() {
    return {
      tab: "newest",
      show_drawer: false,
      article: null || String() || Number(),

      id: null || Number(),
      title: null || String(),
      preview_img: null || String(),
      author: null || String(),
      text: null || String(),
      date: null || String(),

      team: teamData,
      newest: newestArticleData,
      articledata: articleData
    };
  },
  methods: {
    redirectToHome() {
      window.location.href = "/";
    },
    openArcticle(arcticleData: Article) {
      this.tab = 'viewArticle';
      this.id = arcticleData.id ?? 'error';
      this.title = arcticleData.title.toString() ?? 'error';
      this.preview_img = arcticleData.preview_img.toString() ?? 'error';
      this.author = arcticleData.author.toString() ?? 'error';
      this.text = arcticleData.text.toString() ?? 'error';
      this.date = arcticleData.date.toString() ?? 'error';
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

      <v-navigation-drawer color="surface" v-model="show_drawer" location="right">
        <v-list density="comfortable">
          <v-list-item lines="one" @click="tab = 'newest'" height="50px" variant="flat" append-icon="mdi-newspaper" ripple
            density="comfortable">
            Neuste
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'frankfurt'" height="50px" variant="flat" append-icon="mdi-map-marker"
            ripple density="comfortable">
            Frankfurt
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'wirtschaft'" height="50px" variant="flat" append-icon="mdi-chart-line"
            ripple density="comfortable">
            Wirtschaft
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'usa'" height="50px" variant="flat" append-icon="mdi-flag-variant" ripple
            density="comfortable">
            USA
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'international'" height="50px" variant="flat" append-icon="mdi-earth"
            ripple density="comfortable">
            International
          </v-list-item>

          <v-list-item lines="one" @click="tab = 'team'" height="50px" variant="flat" append-icon="mdi-account-supervisor"
            ripple density="comfortable">
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
                :preview_text="arcticle.text.substring(0, 50) + '...'" :text="arcticle.text" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="frankfurt">
          <v-list color="background" bg-color="background">
            <v-list-item color="background" v-bind:key="arcticle.id" ripple v-for="arcticle in articleData.frankfurt">
              <ArticlePreview @openArticle="openArcticle" :date="arcticle.date" :id="arcticle.id" :title="arcticle.title"
                :preview_img="arcticle.preview_img" :author="arcticle.author"
                :preview_text="arcticle.text.substring(0, 50) + '...'" :text="arcticle.text" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="wirtschaft">
          <v-list color="background" bg-color="background">
            <v-list-item color="background" v-bind:key="arcticle.id" ripple v-for="arcticle in articleData.wirtschaft">
              <ArticlePreview @openArticle="openArcticle" :date="arcticle.date" :id="arcticle.id" :title="arcticle.title"
                :preview_img="arcticle.preview_img" :author="arcticle.author"
                :preview_text="arcticle.text.substring(0, 50) + '...'" :text="arcticle.text" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="usa">
          <v-list color="background" bg-color="background">
            <v-list-item color="background" v-bind:key="arcticle.id" ripple v-for="arcticle in articleData.usa">
              <ArticlePreview @openArticle="openArcticle" :date="arcticle.date" :id="arcticle.id" :title="arcticle.title"
                :preview_img="arcticle.preview_img" :author="arcticle.author"
                :preview_text="arcticle.text.substring(0, 50) + '...'" :text="arcticle.text" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="international">
          <v-list color="background" bg-color="background">
            <v-list-item color="background" v-bind:key="arcticle.id" ripple v-for="arcticle in articleData.international">
              <ArticlePreview @openArticle="openArcticle" :date="arcticle.date" :id="arcticle.id" :title="arcticle.title"
                :preview_img="arcticle.preview_img" :author="arcticle.author"
                :preview_text="arcticle.text.substring(0, 50) + '...'" :text="arcticle.text" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="viewArticle"
          :style="{ display: tab == 'viewArticle' ? 'flex' : 'none', justifyContent: 'center', width: '100%' }">
          <ArticleView :text="text" :id="id" :title="title" :date="date" :preview_img="preview_img" :author="author" />
        </v-window-item>

        <v-window-item value="team">
          <v-container fluid>
            <v-row dense :style="{ gap: '40px' }">
              <v-card color="primary" width="400" v-bind:key="teamMember.name.toString()" v-for="teamMember in teamData">
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

@media screen and (max-width: 600px) {
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
