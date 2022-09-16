<template>
    <footer class="w-full bg-sky-600 py-3 shadow fixed bottom-0">
        <div class="container mx-auto px-5 sm:px-10 lg:px-16">
            <ul class="flex justify-center items-center lg:gap-x-10 gap-x-5">
                <li class="bg-gray-200 rounded px-3 py-1.5 md:px-4 md:py-2.5">
                    <router-link :to="{ name: 'Home' }">
                        <h3>Dashboard</h3>
                    </router-link>
                </li>
                <li class="bg-gray-200 rounded px-3 py-1.5 md:px-4 md:py-2.5">
                    <router-link :to="{ name: 'Item' }">
                        <h3>Items</h3>
                    </router-link>
                </li>
                <li class="bg-gray-200 rounded px-3 py-1.5 md:px-4 md:py-2.5">
                    <router-link :to="{ name: 'Customer' }">
                        <h3>Customer</h3>
                    </router-link>
                </li>
                <li class="bg-gray-200 rounded px-3 py-1.5 md:px-4 md:py-2.5">
                    <router-link :to="{ name: 'Sales' }">
                        <h3>Sales</h3>
                    </router-link>
                </li>
            </ul>
        </div>
    </footer>
</template>