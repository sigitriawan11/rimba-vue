<template>
    <div>
        <nav class="w-full py-4 fixed top-0 bg-sky-600">
            <div class="container mx-auto lg:px-16 sm:px-10 px-5">
                <div class="flex justify-between items-center text-gray-200">
                    <div>
                        <router-link :to="{ name: 'Home' }" class="text-2xl font-bold hover:text-gray-50">Aplikasi Inventory</router-link>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold hover:text-gray-50">Sigit Riawan</h3>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>