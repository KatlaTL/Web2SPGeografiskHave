<script setup>
import HeaderComponent from "@/components/GlobalComponents/HeaderComponent.vue";
import FooterComponent from "@/components/GlobalComponents/FooterComponent.vue";
</script>
<template>
    <HeaderComponent />
    
    <main>
        <div id="error-page-content">
            <h1>404 - page not found</h1>
        </div>
    </main>

    <FooterComponent />
</template>

<style>
#error-page-content {
    margin: auto;
    width: 500px;
    min-height: 350px;
}
</style>