<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: String,
    tileText: String,
    imageFileName: String,
    backgroundColor: String,
    textColor: String,
    linkTextColor: String,
    routerName: String
})

const tileBackgroundColor = computed(() => {
    if (!props.backgroundColor) {
        return "#125F31"; //Fallback color
    }
    return props.backgroundColor;
})

const tileTextColor = computed(() => {
    if (!props.textColor) {
        return "#ffffff"; //Fallback color
    }
    return props.textColor;
})

const tileLinkTextColor = computed(() => {
    if (!props.linkTextColor) {
        return tileBackgroundColor.value; //Fallback color
    }
    return props.linkTextColor;
})
</script>

<template>
    <article class="home-event-tile">
        <section class="home-event-tile-text">
            <div class="home-event-tile-text-div">
                <h3>{{ title }}</h3>
                <p>{{ tileText }}</p>
            </div>
            <div class="home-event-tile-text-link">
                <RouterLink :to="{ name: routerName }">Læs mere</RouterLink>
            </div>
        </section>
        <section class="home-event-tile-img">
            <div>
                <img :src="`src/assets/images/${imageFileName}`" />
            </div>
        </section>
    </article>
</template>

<style>
.home-event-tile-text {
    background-color: v-bind(tileBackgroundColor);
    color: v-bind(tileTextColor);
}

.home-event-tile-text-link {
    background-color: var(--whiteColor);
}

.home-event-tile-text-link a {
    color: v-bind(tileLinkTextColor);
}
</style>