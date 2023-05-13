<script lang="ts">
import { type Article } from '@/types/article';
import FooterArea from '@/components/FooterArea.vue';
import ArticlePreview from '@/components/ArticlePreview.vue';

export default {
  mounted() {
    // Überprüfe, ob der Hash vorhanden ist
    if (window.location.hash && window.location.hash.length > 1) {
      const tabs: any = [
        'home',
        'frankfurt',
        'wirtschaft',
        'usa',
        'international',
      ]
      // Entferne das #-Zeichen vom Ankerwert
      let stab: string = window.location.hash.substring(1);
      if (tabs.includes(stab) == true) {
        console.log(stab)
        this.tab = stab;
      }
    }

    // Überprüfe, ob Suchparameter vorhanden sind
    const params = new URLSearchParams(window.location.search);
    const articleId: string = params.get('id') ?? '';
    const folder: string = params.get('t') ?? '';
    if (articleId && folder) {
      this.openHtml(`/article.html?t=${folder}&id=${articleId}`)
    }
  },
  components: {
    ArticlePreview,
    FooterArea,
  },
  data() {
    return {
      tab: "home",
      show_drawer: false,
      searchText: ''
    };
  },
  methods: {
    redirectToHome() {
      window.location.href = "/";
    },
    search() {
      window.location.href = `/search.html?s=${this.searchText}`
    },
    openHtml(href: string) {
      window.location.href = href;
    },
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
          <v-list-item lines="one" height="50px" variant="flat" width="100%" ripple density="compact">
            <v-text-field style="margin-top: 20px;" append-icon="mdi-magnify" label="Suche" clearable variant="underlined"
              v-model="searchText" flat density="compact" @click:append="search()" />
          </v-list-item>

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

          <v-list-item lines="one" @click="openHtml('redaktion.html')" height="50px" variant="flat"
            append-icon="mdi-account-supervisor" ripple density="comfortable">
            Redaktion
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-tabs v-model="tab" fixed-tabs height="40px" align-tabs="center" center-active density="compact"
        next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left" show-arrows>
        <v-tab value="home"> Start </v-tab>

        <v-tab value="frankfurt"> Frankfurt </v-tab>

        <v-tab value="wirtschaft"> Wirtschaft </v-tab>

        <v-tab value="usa"> USA </v-tab>

        <v-tab value="international"> International </v-tab>
      </v-tabs>
    </header>

    <v-main>
      <v-window v-model="tab">
        <v-window-item value="home"></v-window-item>

        <v-window-item value="frankfurt"></v-window-item>

        <v-window-item value="wirtschaft"></v-window-item>

        <v-window-item value="usa"></v-window-item>

        <v-window-item value="international"></v-window-item>
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
