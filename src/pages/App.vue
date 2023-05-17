<script lang="ts">
import { type Article } from '@/types/article';
import FooterArea from '@/components/FooterArea.vue';
import ArticlePreview from '@/components/ArticlePreview.vue';
import { ref } from 'vue';

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
      return;
    }

    // fetch Data

    fetch('https://raw.githubusercontent.com/FrankfurtDynamics/frankfurttimesarticle/master/articleData.json').then((res: Response) => res.json()).then((data: Record<string, Article[]>) => {
      this.articleData = data;
    }).catch(() => {
      this.error = "Fehler mein Laden der Artikel";
      this.isError = true;
    });
  },
  components: {
    ArticlePreview,
    FooterArea,
  },
  data() {
    return {
      tab: "home",
      show_drawer: false,
      searchText: '',
      articleData: ref<Record<string, Article[]>>({}),
      width: window.innerWidth,
      isError: false,
      error: ''
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

          <v-list-item lines="one" @click="tab = 'home'" height="50px" variant="flat" append-icon="mdi-newspaper" ripple
            density="comfortable">
            Startseite
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
      <v-dialog :width="width >= 700 ? '400px' : '80%'" v-model="isError" close-on-content-click>
        <v-alert closable title="Ein Fehler ist aufgetreten" :text="error" type="error" variant="tonal" v-if="isError" />
      </v-dialog>

      <v-window v-model="tab">
        <v-window-item value="home">
          <v-container>
            <v-row>
              <v-col cols="12" md="8">
                <v-card href="/article.html" color="background" border="none" elevation="1">
                  <v-parallax height="500"
                    src="https://www.politico.eu/cdn-cgi/image/width=1160,height=773,quality=80,onerror=redirect,format=auto/wp-content/uploads/2023/05/09/GettyImages-1253266717-scaled.jpg" />
                  <v-card-title>
                    <h1>
                      Bahnbabo wird Bürgerbabo!
                    </h1>
                  </v-card-title>
                  <v-card-subtitle>
                    17.05.2023
                  </v-card-subtitle>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis repudiandae beatae quae eligendi
                    illum repellendus aliquid quas recusandae eum. Distinctio id tempore tenetur dolores suscipit porro
                    impedit nam, fuga modi nulla repellat aliquam earum reiciendis at est nemo quo eaque? Laborum
                    debitis a placeat officiis eligendi alias. Consectetur repudiandae aut quaerat temporibus deleniti
                    praesentium, deserunt eum quis quas. Molestiae iure, quia numquam illo vitae dicta enim dignissimos
                    asperiores quis suscipit ex voluptas saepe beatae, tenetur distinctio aliquam harum provident
                    obcaecati ea consectetur commodi laudantium? Nihil quas, perferendis cum consequuntur repellat
                    expedita pariatur, corporis dolores, iste sit rem praesentium assumenda in!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis repudiandae beatae quae eligendi
                    illum repellendus aliquid quas recusandae eum. Distinctio id tempore tenetur dolores suscipit porro
                    impedit nam, fuga modi nulla repellat aliquam earum reiciendis at est nemo quo eaque? Laborum
                    debitis a placeat officiis eligendi alias. Consectetur repudiandae aut quaerat temporibus deleniti
                    praesentium, deserunt eum quis quas. Molestiae iure, quia numquam illo vitae dicta enim dignissimos
                    asperiores quis suscipit ex voluptas saepe beatae, tenetur distinctio aliquam harum provident
                    obcaecati ea consectetur commodi laudantium? Nihil quas, perferendis cum consequuntur repellat
                    expedita pariatur, corporis dolores, iste sit rem praesentium assumenda in!
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="background" border="none" elevation="1">
                  <v-img src="/favicon.png" height="30vh"></v-img>
                  <v-card-title>
                    <h3>
                      Bahnbabo wird Bürgerbabo!
                    </h3>
                  </v-card-title>
                  <v-card-subtitle>
                    17.05.2023
                  </v-card-subtitle>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis repudiandae beatae quae eligendi
                    illum repellendus aliquid quas recusandae eum. Distinctio id tempore tenetur dolores suscipit porro
                    impedit nam, fuga modi nulla repellat aliquam earum reiciendis at est nemo quo eaque? Laborum
                    debitis a placeat officiis eligendi alias. Consectetur repudiandae aut quaerat temporibus deleniti
                    praesentium, deserunt eum quis quas. Molestiae iure, quia numquam illo vitae dicta enim dignissimos
                    asperiores quis suscipit ex voluptas saepe beatae, tenetur distinctio aliquam harum provident
                    obcaecati ea consectetur commodi laudantium? Nihil quas, perferendis cum consequuntur repellat
                    expedita pariatur, corporis dolores, iste sit rem praesentium assumenda in!
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="6">
                <v-card height="550px" color="background" border="none" elevation="1">
                  <v-img src="/favicon.png" height="300px"></v-img>
                  <v-card-title>
                    <h3>
                      Bahnbabo wird Bürgerbabo!
                    </h3>
                  </v-card-title>
                  <v-card-subtitle>
                    17.05.2023
                  </v-card-subtitle>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis repudiandae beatae quae eligendi
                    illum repellendus aliquid quas recusandae eum. Distinctio id tempore tenetur dolores suscipit porro
                    impedit nam, fuga modi nulla repellat aliquam earum reiciendis at est nemo quo eaque? Laborum
                    debitis a placeat officiis eligendi alias. Consectetur repudiandae aut quaerat temporibus deleniti
                    praesentium, deserunt eum quis quas. Molestiae iure, quia numquam illo vitae dicta enim dignissimos
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6" md="6">
                <v-card height="550px" color="background" border="none" elevation="1">
                  <v-img src="/favicon.png" height="300px"></v-img>
                  <v-card-title>
                    <h3>
                      Bahnbabo wird Bürgerbabo!
                    </h3>
                  </v-card-title>
                  <v-card-subtitle>
                    17.05.2023
                  </v-card-subtitle>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis repudiandae beatae quae eligendi
                    illum repellendus aliquid quas recusandae eum. Distinctio id tempore tenetur dolores suscipit porro
                    impedit nam, fuga modi nulla repellat aliquam earum reiciendis at est nemo quo eaque? Laborum
                    debitis a placeat officiis eligendi alias. Consectetur repudiandae aut quaerat temporibus deleniti
                    praesentium, deserunt eum quis quas. Molestiae iure, quia numquam illo vitae dicta enim dignissimos
                    asperiores quis suscipit ex voluptas saepe beatae, tenetur distinctio aliquam harum provident
                    obcaecati ea consectetur commodi laudantium? Nihil quas, perferendis cum consequuntur repellat
                    expedita pariatur, corporis dolores, iste sit rem praesentium assumenda in!
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="4">
                <v-card height="400px" color="background" border="none" elevation="1">
                  <v-card-title>
                    <h3>
                      Bahnbabo wird Bürgerbabo!
                    </h3>
                  </v-card-title>
                  <v-card-subtitle>
                    17.05.2023
                  </v-card-subtitle>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis repudiandae beatae quae eligendi
                    illum repellendus aliquid quas recusandae eum. Distinctio id tempore tenetur dolores suscipit porro
                    impedit nam, fuga modi nulla repellat aliquam earum reiciendis at est nemo quo eaque? Laborum
                    debitis a placeat officiis eligendi alias. Consectetur repudiandae aut quaerat temporibus deleniti
                    praesentium, deserunt eum quis quas. Molestiae iure, quia numquam illo vitae dicta enim dignissimos
                    asperiores quis suscipit ex voluptas saepe beatae, tenetur distinctio aliquam harum provident
                    obcaecati ea consectetur commodi laudantium? Nihil quas, perferendis cum consequuntur repellat
                    expedita pariatur, corporis dolores, iste sit rem praesentium assumenda in!
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6" md="4">
                <v-card height="400px" color="background" border="none" elevation="1">
                  <v-card-title>
                    <h3>
                      Bahnbabo wird Bürgerbabo!
                    </h3>
                  </v-card-title>
                  <v-card-subtitle>
                    17.05.2023
                  </v-card-subtitle>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis repudiandae beatae quae eligendi
                    illum repellendus aliquid quas recusandae eum. Distinctio id tempore tenetur dolores suscipit porro
                    impedit nam, fuga modi nulla repellat aliquam earum reiciendis at est nemo quo eaque? Laborum
                    debitis a placeat officiis eligendi alias. Consectetur repudiandae aut quaerat temporibus deleniti
                    praesentium, deserunt eum quis quas. Molestiae iure, quia numquam illo vitae dicta enim dignissimos
                    asperiores quis suscipit ex voluptas saepe beatae, tenetur distinctio aliquam harum provident
                    obcaecati ea consectetur commodi laudantium? Nihil quas, perferendis cum consequuntur repellat
                    expedita pariatur, corporis dolores, iste sit rem praesentium assumenda in!
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card height="400px" color="background" border="none" elevation="1">
                  <v-card-title>
                    <h3>
                      Bahnbabo wird Bürgerbabo!
                    </h3>
                  </v-card-title>
                  <v-card-subtitle>
                    17.05.2023
                  </v-card-subtitle>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis repudiandae beatae quae eligendi
                    illum repellendus aliquid quas recusandae eum. Distinctio id tempore tenetur dolores suscipit porro
                    impedit nam, fuga modi nulla repellat aliquam earum reiciendis at est nemo quo eaque? Laborum
                    debitis a placeat officiis eligendi alias. Consectetur repudiandae aut quaerat temporibus deleniti
                    praesentium, deserunt eum quis quas. Molestiae iure, quia numquam illo vitae dicta enim dignissimos
                    asperiores quis suscipit ex voluptas saepe beatae, tenetur distinctio aliquam harum provident
                    obcaecati ea consectetur commodi laudantium? Nihil quas, perferendis cum consequuntur repellat
                    expedita pariatur, corporis dolores, iste sit rem praesentium assumenda in!
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-window-item>

        <v-window-item value="frankfurt">
          <v-list variant="text" :rounded="0" density="compact" border="0" bg-color="background" color="background"
            elevation="0">
            <v-list-item elevation="0" border="0" v-bind:key="index" v-for="(article, index) in articleData.frankfurt">
              <ArticlePreview :title="article.title" :preview_img="article.img" :preview_text="article.preview_text"
                :date="article.date" :url="article.url" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="wirtschaft">
          <v-list bg-color="background" color="background" elevation="0">
            <v-list-item elevation="0" border="0" v-bind:key="index" v-for="(article, index) in articleData.wirtschaft">
              <ArticlePreview :title="article.title" :preview_img="article.img" :preview_text="article.preview_text"
                :date="article.date" :url="article.url" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="usa">
          <v-list bg-color="background" color="background" elevation="0">
            <v-list-item elevation="0" border="0" v-bind:key="index" v-for="(article, index) in articleData.usa">
              <ArticlePreview :title="article.title" :preview_img="article.img" :preview_text="article.preview_text"
                :date="article.date" :url="article.url" />
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="international">
          <v-list bg-color="background" color="background" elevation="0">
            <v-list-item elevation="0" border="0" v-bind:key="index"
              v-for="(article, index) in articleData.international">
              <ArticlePreview :title="article.title" :preview_img="article.img" :preview_text="article.preview_text"
                :date="article.date" :url="article.url" />
            </v-list-item>
          </v-list>
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
