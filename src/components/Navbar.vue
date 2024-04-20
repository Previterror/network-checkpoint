<script setup>
import { onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';

const theme = ref(loadState('theme') || 'light')

onMounted(() => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
})

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}

</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-info px-3 sticky-top">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <h1><i class="mdi mdi-vpn"></i></h1>
        <h3>Network</h3>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <!-- <router-link :to="{ name: 'About' }" class="btn text-dark lighten-30 selectable text-uppercase">
            About
          </router-link> -->
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <div class="container">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search" aria-label="Search"
            aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">Button</button>
          </div>
        </div>

      </div>
      <Login />
    </div>
  </nav>
</template>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
