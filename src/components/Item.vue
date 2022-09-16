<template>
    <div>
        <div class="flex justify-between mb-3">
            <button class="block bg-green-500 rounded px-5 py-2 text-white text-sm" @click="addItem">Tambah Item</button>
        </div>

        <div v-if="statusItem" class="bg-green-500 rounded px-5 py-2 text-sm text-white w-fit mb-3">
            {{ flash }}
        </div>
        
        <div class="w-full overflow-x-auto">
            <table class="w-full overflow-x-auto shadow-lg">
                <thead class="bg-blue-400">
                    <tr class="text-left">
                        <th class="px-5 py-2 text-gray-50">#</th>
                        <th class="px-5 py-2 text-gray-50">Kode Barang</th>
                        <th class="px-5 py-2 text-gray-50">Gambar Barang</th>
                        <th class="px-5 py-2 text-gray-50">Nama</th>
                        <th class="px-5 py-2 text-gray-50">Unit</th>
                        <th class="px-5 py-2 text-gray-50">Stok</th>
                        <th class="px-5 py-2 text-gray-50">Harga Satun</th>
                        <th class="px-5 py-2 text-gray-50">Aksi</th>
                    </tr>
                </thead>
                <tbody v-if="items">
                    <tr class="bg-gray-200 border-b-2 border-gray-300" v-for="(item, index) in items" :key="index">
                        <td class="px-5 py-2">{{ index += 1 }}</td>
                        <td class="px-5 py-2">{{ item.kode_item }}</td>
                        <td class="px-5 py-2">
                            <img :src="`http://127.0.0.1:8000/storage/${item.barang}`" class="w-24" alt="">
                        </td>
                        <td class="px-5 py-2">{{ item.nama_item }}</td>
                        <td class="px-5 py-2">{{ item.unit }}</td>
                        <td class="px-5 py-2">{{ item.stok }}</td>
                        <td class="px-5 py-2">{{ item.harga_satuan }}</td>
                        <td class="px-5 py-2 space-x-2">
                            <button class="bg-red-400 hover:bg-red-500 text-gray-200 hover:text-gray-50 px-4 py-2 text-sm" @click="deleteItem(item.kode_item)">Delete</button>
                        </td>
                    </tr>
                </tbody>
                <div v-if="!items">
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

        const addItem = () => {
            router.push({ name: "AddItem" })
        }

        const deleteItem = (kode_item) => {
            flash.value = ""
            store.commit("setFlashItem", "")
            store.commit("setStatusItem", false)
            store.dispatch('deleteItem', {
                kode_item: kode_item
            })
        }

        const statusItem = computed(() => {
            if(store.state.statusItem){
                store.dispatch('getItems')
                flash.value = store.state.flashItem
                return store.state.statusItem
            }

        })

        const items = computed(() => { 
            return store.state.items.length ? store.state.items : false
        })

        onMounted(() => {
            flash.value = ""
            store.commit("setFlashItem", "")
            store.commit("setStatusItem", false)
            store.dispatch('getItems')
        })

        return { addItem, search, searchBtn, items, deleteItem, statusItem, flash }
    },
}
</script>