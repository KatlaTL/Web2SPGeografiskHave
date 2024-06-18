<script setup>
import { computed } from 'vue';
import { useBreadcrumbsStore } from '@/stores/breadcrumbs';

const breadcrumbStore = useBreadcrumbsStore();

const breadcrumbs = computed(() => breadcrumbStore.breadcrumbs);

breadcrumbs.value.sort((a, b) => a.breadcrumbLevel - b.breadcrumbLevel);
</script>


<template>

    <section id="breadcrumbs-container">
        <div id="breadcrumbs-flex">
            <div class="breadcrumb" v-for="(b, index) in breadcrumbs" :key="b.routePath">
                <RouterLink :to="b.routePath" v-if="index != breadcrumbs.length - 1">
                    {{ b.routeName }}
                </RouterLink>

                <span v-else>
                    {{ b.routeName }}
                </span>
            </div>
        </div>
    </section>

</template>