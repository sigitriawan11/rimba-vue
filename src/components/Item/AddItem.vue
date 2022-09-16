<template>
    <div>
        {{ statusItem }}
        <h3 class="mb-5">Tambah Item</h3>
        <label class="block">Gambar Item</label>
        <input @change="image" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="file"  placeholder="Kode Item">
        <input class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="text" v-model="kode_item" placeholder="Kode Item">
        <input class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="text" v-model="nama_item" placeholder="Nama Item">
        <label class="block">Unit : </label>
        <select @change="unit" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3">
            <option value="kg">KG</option>
            <option value="pcs">PCS</option>
        </select>
        <input placeholder="Stok" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="number" v-model="stok">
        <input placeholder="Harga Satuan" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="number" v-model="harga_satuan">
        <button @click="addItem" class="bg-green-500 rounded text-sm text-white px-3 py-1.5 hover:bg-green-600">Add</button>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed, onMounted } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const store = useStore()
        const router  = useRouter()

        const data = reactive({
            barang: "",
            kode_item: "",
            nama_item: "",
            unit: "kg",
            stok: "",
            harga_satuan: "",
        })

        const image = (e) => {
            data.barang = e.target.files[0]
        }
        
        const statusItem = computed(() => {
            if(store.state.statusItem){
                router.push({ name: "Item" })
            }
        })
        const unit = (e) => {
            data.unit = e.target.value
        }
        
        const addItem = () => {
            if(data.barang == "" || data.kode_item == "" || data.nama_item == "" || data.stok == "" || data.harga_satuan == ""){
                alert('MASUKAN DATA DENGAN BENAR')
            } else {
                const form = new FormData()
                form.append('barang', data.barang)
                form.append('kode_item', data.kode_item)
                form.append('nama_item', data.nama_item)
                form.append('unit', data.unit)
                form.append('stok', data.stok)
                form.append('harga_satuan', data.harga_satuan)
                store.dispatch('addItem', form)
            }
        }

        onMounted(() => {
            data.barang = ""
             data.kode_item = ""
             data.nama_item = ""
             data.stok = ""
             data.harga_satuan = ""
        })

        return { ...toRefs(data), unit, addItem, statusItem, image }
    },
}
</script>