<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NavBarComponent from '@/components/GlobalComponents/NavBarComponent.vue';
import DeleteModal from '@/components/AdminComponents/DeleteModal.vue';
import { addNavBarItem, changeOrderOfItem, deleteNavBarItem, doesRouteExists, getRouteDataByName, updateNavBarItem } from '@/services/adminServices/AdminNavigationService';
import { populateRoutes } from '@/services/NavigationService';
import { reverse_debounce } from '@/helpers/debounce';

const router = useRouter();

const initialState = () => {
    return {
        routerName: "",
        routerPath: "",
        title: "",
        routerComponentName: "",
        routerID: null
    }
}

const navBarItem = ref(initialState())
const routeNameRef = ref("");

const errorMessage = ref("");
const navComponentKey = ref(0);
const isModalOpened = ref(false);

const handleOrderOfItem = async (direction) => {
    const result = await changeOrderOfItem(navBarItem.value.routerID, direction);

    if (result?.error) {
        errorMessage.value = result.error?.message || result.error?.userFriendlyMessage;
    } else {
        errorMessage.value = "";
        navForceRerender();
    }
}

const debounceHandleOrderofItem = reverse_debounce(handleOrderOfItem, 350);

const handleAddItem = async () => {
    if (await doesRouteExists(navBarItem.value.routerID)) {
        errorMessage.value = "Route already exists!";
        return;
    }

    const result = await addNavBarItem(navBarItem.value);

    if (result?.error) {
        errorMessage.value = result.error?.message || result.error?.userFriendlyMessage;
    } else {
        navBarItem.value = initialState();
        errorMessage.value = "";
        navForceRerender();
    }
}

const handleEditItem = async () => {
    const result = await updateNavBarItem(navBarItem.value.routerID, {
        routerName: navBarItem.value.routerName,
        routerPath: navBarItem.value.routerPath,
        routerComponentName: navBarItem.value.routerComponentName,
        routerMeta: { location: "navbar", title: navBarItem.value.title },
    })

    if (result?.error) {
        errorMessage.value = result.error?.userFriendlyMessage;
    } else {
        navForceRerender(routeNameRef.value);
        navBarItem.value = initialState();
        errorMessage.value = "";
    }
}

const handleDeleteItem = async () => {
    const result = await deleteNavBarItem(navBarItem.value.routerID);

    if (result?.error) {
        errorMessage.value = result.error?.userFriendlyMessage;
    } else {
        navForceRerender(routeNameRef.value);
        navBarItem.value = initialState();
        errorMessage.value = "";
        closeModal();
    }
}

const openModal = () => isModalOpened.value = true;

const closeModal = () => isModalOpened.value = false;

const acceptModal = async () => await handleDeleteItem();


const navForceRerender = async (routerName = null) => {
    await populateRoutes(router, routerName);
    navComponentKey.value++;
}

const getRouteData = async (routerName) => {
    const result = await getRouteDataByName(routerName);

    if (result.result) {
        navBarItem.value.routerName = result.result?.routerName;
        navBarItem.value.routerPath = result.result?.routerPath;
        navBarItem.value.routerComponentName = result.result?.routerComponentName;
        navBarItem.value.title = result.result?.routerMeta?.title;
        navBarItem.value.routerID = result.result?.id;

        routeNameRef.value = result.result?.routerName;

        errorMessage.value = "";
    } else {
        errorMessage.value = result.error?.userFriendlyMessage;
    }
}

const clearRouterData = () => {
    navBarItem.value = initialState();
    errorMessage.value = "";
}
</script>

<template>

    <div class="admin-navbar">
        <h2>Tilføj, slet eller redigere main navigation</h2>
        <p>Klik på et menupunkt for at hente dataen for redigering eller sletning</p>

        <NavBarComponent adminPage="true" :key="navComponentKey" @getRouteData="(name) => getRouteData(name)" />

        <div v-show="navBarItem.routerID" class="admin-navbar-order">
            <h3>Ændre rækkefølgen af menupunkterne</h3>
            <p>Flyt det aktive menupunkt</p>
            <div class="admin-navbar-order-ctas">
                <button @click="debounceHandleOrderofItem('left')" class="admin-navbar-order-cta"><<</button>
                <button @click="debounceHandleOrderofItem('right')" class="admin-navbar-order-cta">>></button>
            </div>
        </div>

        <div class="admin-navbar-form">
            <form @submit.prevent="">
                <input type="text" name="routerName" placeholder="Router Name" v-model="navBarItem.routerName" />
                <input type="text" name="routerPath" placeholder="Router Path. Remember to include /"
                    v-model="navBarItem.routerPath" />
                <input type="text" name="title" placeholder="Page title" v-model="navBarItem.title" />
                <input type="text" name="routerComponentName"
                    placeholder="Router Component Name. Exclude file extension"
                    v-model="navBarItem.routerComponentName" />

                <div v-show="navBarItem.routerID" class="admin-navbar-form-router-id">
                    <p>Navbar item ID: {{ navBarItem.routerID }}</p>
                    <button class="admin-navbar-form-cta" @click="clearRouterData">Clear route</button>
                </div>

                <button class="admin-navbar-form-cta" @click="handleAddItem">Tilføj menupunkt</button>

                <button class="admin-navbar-form-cta" @click="handleEditItem">Redigere menupunkt</button>

                <button v-show="navBarItem.routerID" class="admin-navbar-form-cta" @click="openModal">Slet menupunkt</button>

                <DeleteModal :isOpen="isModalOpened" @modal-close="closeModal" @accept-delete="acceptModal"
                    @cancel-delete="closeModal" :itemID="navBarItem.routerID" />

                <p v-show="errorMessage" class="login-error-message login-panel-error-message">
                    {{ errorMessage }}
                </p>
            </form>
        </div>

    </div>

</template>