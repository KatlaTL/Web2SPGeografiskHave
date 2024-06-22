<script setup>
import NavBarAdmin from '@/components/AdminComponents/NavBarAdmin.vue';
import EventAdmin from '@/components/AdminComponents/EventAdmin.vue';
import { adminLogout } from '@/services/LoginService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const activeAdminContent = ref("mainNav");

const router = useRouter();

const setActiveAdminContent = (content) => activeAdminContent.value = content;

const handleSignOut = async () => {
    const logout = await adminLogout();

    if (logout.success) {
        router.push("/admin-login");
    }
}

</script>

<template>
    <main>
        <div class="admin-panel">
            <h1>Admin panel</h1>

            <div class="admin-show-section">
                <button @click="() => setActiveAdminContent('mainNav')"
                    :class="{ active: activeAdminContent === 'mainNav' }">Main navigation</button>
                <button @click="() => setActiveAdminContent('events')"
                    :class="{ active: activeAdminContent === 'events' }">Events</button>
            </div>

            <NavBarAdmin v-show="activeAdminContent === 'mainNav'" />

            <EventAdmin v-show="activeAdminContent === 'events'" />

            <button class="login-button logout-button" @click="handleSignOut">Logout</button>
        </div>
    </main>
</template>