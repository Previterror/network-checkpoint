<script setup>
import { Merc } from '../models/Merc.js';


defineProps({ merc: { type: Merc, required: true } })
</script>


<template>
    <a :href="merc.linkURL" class="my-5">
        <img :src="merc.banner" :alt="merc.title" :title="merc.title" class="img-fluid my-5">
    </a>
</template>


<style lang="scss" scoped></style>