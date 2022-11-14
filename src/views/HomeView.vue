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
    <form class="flex items-center">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div
          class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
          required
        />
      </div>
      <button
        type="submit"
        class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span class="sr-only">Search</span>
      </button>
    </form>

    <input
      type="text"
      v-model="searchQuery"
      @input="searchArticles"
      placeholder="football ..."
      class="py-2 px-1 w-full bg-transparent border-b focus:border-orange focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] my-10"
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
          <div
            class="flex justify-center rounded-lg bg-blue-700 hover:bg-blue-800"
          >
            <a
              :href="article.url"
              target="_blank"
              class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white"
            >
              link
            </a>
          </div>
        </div>
      </div>
    </template>

    <!-- Pagination -->

    <nav aria-label="Page navigation example">
      <ul class="inline-flex -space-x-px">
        <li>
          <a
            href="#"
            class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >Previous</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >2</a
          >
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            class="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >3</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >4</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >5</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped></style>
