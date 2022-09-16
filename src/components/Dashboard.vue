<template>
    <div>
        <navbar-vue />
        <div class="container mx-auto px-5 sm:px-10 lg:px-16 py-20">
            <router-view />
        </div>
        <footer-vue />
    </div>
</template>

<script>
import NavbarVue from './Template/Navbar.vue';
import FooterVue from './Template/Footer.vue';
export default {
    components: { NavbarVue, FooterVue },
    setup() {
        
    },
}
</script>