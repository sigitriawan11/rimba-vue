<template>
    <div class="">
        {{ statusCustomer }}
        <h3 class="mb-5">Tambah Customer</h3>
        <label class="block">KTP</label>
        <input @change="ktp" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="file">
        <input class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="text" v-model="nama" placeholder="Nama">
        <input class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="number" v-model="contact" placeholder="Contact">
        <input class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="email" v-model="email" placeholder="Email">
        <label class="block">Diskon Tipe : </label>
        <select @change="diskonTipe" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3">
            <option value="persen">Persentase</option>
            <option value="fix">FIX</option>
        </select>
        <input placeholder="diskon" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" type="number" v-model="diskon">
        <textarea placeholder="Alamat" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3" v-model="alamat"></textarea>
        <button @click="addCustomer" class="bg-green-500 rounded text-sm text-white px-3 py-1.5 hover:bg-green-600">Add</button>
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
            ktp: "",
            nama: "",
            contact: "",
            email: "",
            diskon_tipe: "persen",
            diskon: "",
            alamat: "",
        })

        const ktp = (e) => {
            data.ktp = e.target.files[0]
        }
        
        const statusCustomer = computed(() => {
            if(store.state.statusCustomer){
                router.push({ name: "Customer" })
            }
        })
        const diskonTipe = (e) => {
            data.diskon_tipe = e.target.value
        }
        
        const addCustomer = () => {
            if(data.ktp == "" || data.nama == "" || data.contact == "" || data.email == "" || data.diskon == "" || data.alamat == ""){
                alert('MASUKAN DATA DENGAN BENAR')
            } else {
                console.log(data.diskon_tipe)
                const form = new FormData()
                form.append('ktp', data.ktp)
                form.append('nama', data.nama)
                form.append('contact', data.contact)
                form.append('email', data.email)
                form.append('diskon_tipe', data.diskon_tipe)
                form.append('diskon', data.diskon)
                form.append('alamat', data.alamat)
                store.dispatch('addCustomer', form)
            }
        }

        onMounted(() => {
            data.ktp = ""
             data.nama = ""
             data.contact = ""
             data.email = ""
             data.diskon = ""
             data.alamat = ""
        })

        return { ...toRefs(data), diskonTipe, addCustomer, statusCustomer, ktp }
    },
}
</script>