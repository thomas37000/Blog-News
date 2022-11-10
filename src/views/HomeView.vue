<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-undef -->
<script setup>
import { ref, onMounted } from "vue";
import CardArticle from "../components/CardArticle.vue";

const listeArticles = ref([]);
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResult = ref([]);

const token = import.meta.env.VITE_API_TOKEN;

onMounted(() => {
  loadArticles();
  searchArticles();
});

async function loadArticles() {
  const result = await axios.get();
  // Mettre à jour le modèle
  // pour mettre à jour une variable de notre modèle initialisée avec ref(), il faut utiliser .value
  listeArticles.value = result.data.articles;
  console.log("API", listeArticles.value);
}

async function searchArticles() {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const result = await axios.get(
        `https://newsapi.org/v2/everything?q=${searchQuery.value}&apiKey=${token}`
      );
      searchResult.value = result.data.articles;
      console.log("SEARCH", searchResult.value);
    }
  }, 300);
}
</script>

<template>
  <div class="flex flex-wrap space-x-4 space-y-4 mt-5">
    <input
      type="text"
      v-model="searchQuery"
      @input="searchArticles"
      class="py-2 px-1 w-full bg-transparent border-b focus:border-orange focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
    />

    <!-- RESULT SEARCH -->

    <template v-if="searchResult">
      <div
        v-for="search in searchResult"
        :key="search.id"
        class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <img
          class="rounded-t-lg"
          :src="search.urlToImage"
          :alt="search.title"
        />

        <div class="p-5">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ search.title }}
          </h5>

          <div class="mb-2">{{ search.author }}</div>

          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ search.description }}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ search.source.name }}
          </p>
          <a
            href="search.url"
            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            link
          </a>
        </div>
      </div>
    </template>

    <!-- All Articles by default -->

    <template v-if="listeArticles">
      <div
        v-for="article in listeArticles"
        :key="article.id"
        class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      >
        <img
          class="rounded-t-lg"
          :src="article.urlToImage"
          :alt="article.title"
        />

        <div class="p-5">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {{ article.title }}
          </h5>

          <div class="mb-2">{{ article.author }}</div>

          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ article.description }}
          </p>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ article.source.name }}
          </p>
          <a
            href="article.url"
            class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            link
          </a>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>