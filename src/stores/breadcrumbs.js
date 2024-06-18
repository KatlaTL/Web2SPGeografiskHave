import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useBreadcrumbsStore = defineStore('breadcrumbs', () => {
    const breadcrumbs = ref([{
        breadcrumbLevel: 1,
        routePath: "/",
        routeName: "Home"
    }]);

    const addBreadcrumb = (breadcrumb) => breadcrumbs.value.push(breadcrumb);
    const removeBreadcrumbs = (index) => breadcrumbs.value.splice(index);

    return { breadcrumbs, addBreadcrumb, removeBreadcrumbs }
})