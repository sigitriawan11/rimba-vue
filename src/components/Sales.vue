<template>
    <div>
        <div class="flex justify-between mb-3">
            <button class="block bg-green-500 rounded px-5 py-2 text-white text-sm" @click="addSales">Tambah Sales</button>
        </div>
        <div v-if="statusSales" class="bg-green-500 rounded px-5 py-2 text-sm text-white w-fit mb-3">
            {{ flash }}
        </div>
        <div class="w-full overflow-x-auto">
            <table class="w-full overflow-x-auto shadow-lg">
                <thead class="bg-blue-400">
                    <tr class="text-left">
                        <th class="px-5 py-2 text-gray-50">#</th>
                        <th class="px-5 py-2 text-gray-50">Kode TRX</th>
                        <th class="px-5 py-2 text-gray-50">Tanggal</th>
                        <th class="px-5 py-2 text-gray-50">Nama Customer</th>
                        <th class="px-5 py-2 text-gray-50">Nama Barang</th>
                        <th class="px-5 py-2 text-gray-50">Quantity</th>
                        <th class="px-5 py-2 text-gray-50">Diskon</th>
                        <th class="px-5 py-2 text-gray-50">Total Harga</th>
                        <th class="px-5 py-2 text-gray-50">Total Bayar</th>
                        <th class="px-5 py-2 text-gray-50">Aksi</th>
                    </tr>
                </thead>
                <tbody v-if="sales">
                    <tr class="bg-gray-200 border-b-2 border-gray-300" v-for="(sale, index) in sales" :key="index">
                        <td class="px-5 py-2">{{ index += 1 }}</td>
                        <td class="px-5 py-2">{{ sale.code_transaksi }}</td>
                        <td class="px-5 py-2">{{ sale.tanggal_transaksi }}</td>
                        <td class="px-5 py-2">{{ sale.customer.nama }}</td>
                        <td class="px-5 py-2">{{ sale.item.nama_item }}</td>
                        <td class="px-5 py-2">{{ sale.qty }}</td>
                        <td class="px-5 py-2">{{ sale.total_diskon }}</td>
                        <td class="px-5 py-2">{{ sale.total_harga }}</td>
                        <td class="px-5 py-2">{{ sale.total_bayar }}</td>
                        <td class="px-5 py-2">
                            <button @click="deleteSales(sale.code_transaksi)" class="bg-red-400 hover:bg-red-500 text-gray-200 hover:text-gray-50 px-4 py-2 text-sm">Delete</button>
                        </td>
                    </tr>
                </tbody>
                <div v-if="!sales">
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

        const addSales = () => {
            router.push({ name: "AddSales" })
        }

        const deleteSales = (code_transaksi) => {
            flash.value = ""
            store.commit("setFlashSales", "")
            store.commit("setStatusSales", false)
            store.dispatch('deleteSales', {
                code_transaksi: code_transaksi
            })
        }

        const statusSales = computed(() => {
            if(store.state.statusSales){
                store.dispatch('getSales')
                flash.value = store.state.flashSales
                return store.state.statusSales
            }

        })

        const sales = computed(() => { 
            return store.state.sales.length ? store.state.sales : false
        })

        onMounted(() => {
            flash.value = ""
            store.commit("setFlashSales", "")
            store.commit("setStatusSales", false)
            store.dispatch('getSales')
        })

        return { addSales, search, searchBtn, sales, deleteSales, statusSales, flash, deleteSales }
    },
}
</script>