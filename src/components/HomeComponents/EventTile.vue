<script setup>
import { computed } from 'vue';
import { useRouter } from "vue-router";

const props = defineProps({
    title: String,
    tileText: String,
    imageURL: String,
    imageAltText: String,
    backgroundColor: String,
    textColor: String,
    linkTextColor: String,
    tileSubPage: Object
})

const routerPath = props.tileSubPage?.routerPath;
const routerName = props.tileSubPage?.routerName;

const router = useRouter();

if (routerPath && routerName) {
    router.addRoute({
        path: props.tileSubPage.routerPath,
        name: props.tileSubPage.routerName,
        component: () => import('@/views/ErrorView.vue') //Ideally link to existing component
    })
}

const routerLinkPath = computed(() => {
    if (router.hasRoute(routerName)) {
        return {
            name: routerName
        }
    } else if (props.tileSubPage?.externalLink) {
        return props.tileSubPage.externalLink;
    }
    return {};
})

const isExternalLink = computed(() => {
    return typeof routerLinkPath.value === 'string' && (routerLinkPath.value.startsWith("http") || routerLinkPath.value.startsWith("https"));
})

const tileBodyText = computed(() => {
    if (props.tileText.length > 130) {
        return props.tileText.trim().substring(0, 130).concat("...");
    }
    return props.tileText.trim();
})

const tileTitle = computed(() => {
    if (props.title.length > 39) {
        return props.title.trim().substring(0, 36).concat("...");
    }
    return props.title.trim();
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
    <article class="home-event-tile flex flex-row mt-32">
        <section class="home-event-tile-text 
        sm:w-26
        ">
            <div class="home-event-tile-text-div">
                <h3>{{ tileTitle }}</h3>
                <p>{{ tileBodyText }}</p>
            </div>
            <div class="home-event-tile-text-link">
                <a v-if="isExternalLink" :href="routerLinkPath" target="_blank">Læs mere</a>

                <RouterLink v-else :to="routerLinkPath">Læs mere</RouterLink>
            </div>
        </section>
        <section class="home-event-tile-img">
            <div>
                <img :src="imageURL" :alt="imageAltText" class="xsm:hidden  mdsm:block"/>
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