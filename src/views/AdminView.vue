<script setup>
import NavBarAdmin from '@/components/AdminComponents/NavBarAdmin.vue';
import { adminLogout } from '@/services/LoginService';

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

            <NavBarAdmin />

            <button class="login-button logout-button" @click="handleSignOut">Logout</button>
        </div>
    </main>
</template>