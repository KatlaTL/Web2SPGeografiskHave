<script setup>
import { adminLogout } from '@/services/LoginService';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleSignOut = async () => {
    const logout = await adminLogout();

    if (logout.success) {
        router.push("/admin-login");
    }
}
</script>

<template>

    <h1>Admin panel</h1>
    <button @click="handleSignOut">Logout</button>
</template>