<template>
    <div>
        <div class="flex justify-between mb-3">
            <button class="block bg-green-500 rounded px-5 py-2 text-white text-sm" @click="addCustomer">Tambah Customer</button>
        </div>
        <div v-if="statusCustomer" class="bg-green-500 rounded px-5 py-2 text-sm text-white w-fit mb-3">
            {{ flash }}
        </div>
        <div class="w-full overflow-x-auto">
            <table class="w-full overflow-x-auto shadow-lg">
                <thead class="bg-blue-400">
                    <tr class="text-left">
                        <th class="px-5 py-2 text-gray-50">#</th>
                        <th class="px-5 py-2 text-gray-50">Ktp</th>
                        <th class="px-5 py-2 text-gray-50">Nama</th>
                        <th class="px-5 py-2 text-gray-50">Contact</th>
                        <th class="px-5 py-2 text-gray-50">Email</th>
                        <th class="px-5 py-2 text-gray-50">Alamat</th>
                        <th class="px-5 py-2 text-gray-50">Diskon</th>
                        <th class="px-5 py-2 text-gray-50">Diskon Tipe</th>
                        <th class="px-5 py-2 text-gray-50">Aksi</th>
                    </tr>
                </thead>
                <tbody v-if="customers">
                    <tr class="bg-gray-200 border-b-2 border-gray-300" v-for="(customer, index) in customers" :key="index">
                        <td class="px-5 py-2">{{ index += 1 }}</td>
                        <td class="px-5 py-2">
                            <img :src="`http://127.0.0.1:8000/storage/${customer.ktp}`" class="w-24" alt="">
                        </td>
                        <td class="px-5 py-2">{{ customer.nama }}</td>
                        <td class="px-5 py-2">{{ customer.contact }}</td>
                        <td class="px-5 py-2">{{ customer.email }}</td>
                        <td class="px-5 py-2">{{ customer.alamat }}</td>
                        <td class="px-5 py-2">{{ customer.diskon }}</td>
                        <td class="px-5 py-2">{{ customer.diskon_tipe }}</td>
                        <td class="px-5 py-2">
                            <button @click="deleteCustomer(customer.email)" class="bg-red-400 hover:bg-red-500 text-gray-200 hover:text-gray-50 px-4 py-2 text-sm">Delete</button>
                        </td>
                    </tr>
                </tbody>
                <div v-if="!customers">
                    Data belum ada
                </div>
            </table>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex"
export default {
    setup() {
        const store = useStore()
        const router = useRouter()

        const search = ref("")
        const searchBtn = () => {

        }

        const flash = ref("")

        const addCustomer = () => {
            router.push({ name: "AddCustomer" })
        }

        const deleteCustomer = (email) => {
            flash.value = ""
            store.commit("setFlashCustomer", "")
            store.commit("setStatusCustomer", false)
            store.dispatch('deleteCustomer', {
                email: email
            })
        }

        const statusCustomer = computed(() => {
            if(store.state.statusCustomer){
                store.dispatch('getCustomers')
                flash.value = store.state.flashCustomer
                return store.state.statusCustomer
            }

        })

        const customers = computed(() => { 
            return store.state.customers.length ? store.state.customers : false
        })

        onMounted(() => {
            flash.value = ""
            store.commit("setFlashCustomer", "")
            store.commit("setStatusCustomer", false)
            store.dispatch('getCustomers')
        })

        return { addCustomer, search, searchBtn, customers, deleteCustomer, statusCustomer, flash, deleteCustomer }
    },
}
</script>