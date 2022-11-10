<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-undef -->
<script setup>
import { ref, onMounted } from "vue";
import CardArticle from "../components/CardArticle.vue";

const listeArticles = ref([]);

onMounted(() => {
  loadArticles();
});

async function loadArticles() {
  const result = await axios.get();

  // Mettre à jour le modèle
  // pour mettre à jour une variable de notre modèle initialisée avec ref(), il faut utiliser .value
  listeArticles.value = result.data.articles;
  console.log("API", listeArticles.value); // ne pas oublier .data (équivalent de data.json() avec fetch)
}
</script>

<template>
  <div class="flex flex-wrap space-x-4 space-y-4 mt-5">
    <div
      v-for="article in listeArticles"
      :key="article.id"
      class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <!-- TODO PROPS -->
      <!-- <CardArticle :art="art" /> -->
      <!--            -->
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
  </div>
</template>

<style scoped></style>
