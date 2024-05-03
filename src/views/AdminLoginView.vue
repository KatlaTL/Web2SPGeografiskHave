<script setup>
import { validateEmail } from '@/helpers/validate';
import { adminRegister, adminLogin } from '@/services/LoginService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formData = ref({
    email: {
        value: "",
        invalid: false
    },
    password: {
        value: "",
        invalid: false
    }
})

const errorMessage = ref("");

const router = useRouter();

const handleRegister = async () => {
    if (!validateForm()) {
        return;
    }

    if (validateEmail(formData.value.email.value)) {
        const register = await adminRegister(formData.value.email.value, formData.value.password.value);

        if (register.error) {
            errorMessage.value = register.error?.userFriendlyMessage;
        }

        if (register.success) {
            router.push("/admin");
        }
    }
}
const handleLogin = async () => {
    if (!validateForm()) {
        return;
    }

    if (validateEmail(formData.value.email.value)) {
        const loggedIn = await adminLogin(formData.value.email.value, formData.value.password.value);

        if (loggedIn.error) {
            errorMessage.value = loggedIn.error?.userFriendlyMessage;
        }

        if (loggedIn.success) {
            router.push("/admin");
        }
    }
}

const validateForm = () => {
    let valid = true;
    for (const [key, value] of Object.entries(formData.value)) {
        if (!value.value) {
            value.invalid = true;
            valid = false;
        } else {
            value.invalid = false;
        }
    }

    return valid;
}

</script>

<template>
    <main>
        <div id="login-screen">
            <div id="login-content">
                <h1>Admin Login</h1>
                <form @submit.prevent="false">
                    <input type="email" placeholder="E-mail" :class="{ required: formData.email.invalid }"
                        v-model="formData.email.value" required>
                    <input type="password" placeholder="Password" :class="{ required: formData.password.invalid }"
                        v-model="formData.password.value" required>

                    <p v-show="errorMessage" class="login-error-message">
                        {{ errorMessage }}
                    </p>
                    <button @click="handleLogin">Login</button>
                    <button @click="handleRegister">Opret ny bruger</button>
                </form>
            </div>
        </div>
    </main>
</template>