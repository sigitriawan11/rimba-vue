<template>
    <div class="">
        {{ statusSales }}
        <h3 class="mb-5">Tambah Sales</h3>
        <label class="block">Customer</label>
        <select @change="customer" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3">
            <option >Select</option>
            <option :value="customer.id" v-for="( customer, index ) in customers" :key="index">
                {{ customer.nama }}
            </option>
        </select>
        <label class="block">Item</label>
        <select @change="item" class="block focus:outline-2 focus:outline-blue-300 bg-gray-100 shadow px-3 py-2 mb-3">
            <option >Select</option>
            <option :value="item.id" v-for="( item, index ) in items" :key="index">
                {{ item.nama_item }}
            </option>
        </select>
        <div class="mb-3">
            <label class="block">Quantity</label>
            <button class="border px-2 py-1 rounded" @click="addQty">+</button>
            <button>{{ qty }}</button>
            <button class="border px-2 py-1 rounded" @click="minQty">-</button>
        </div>
    
        <button @click="addSales" class="bg-green-500 rounded text-sm text-white px-3 py-1.5 hover:bg-green-600">Add</button>
    </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const store = useStore()
        const router  = useRouter()

        const customerId = ref()
        const data_items = ref()
        const qty = ref(1)
        
        const statusSales = computed(() => {
            if(store.state.statusSales){
                router.push({ name: "Sales" })
            }
        })

        const addQty =() => {
            qty.value += 1
        }
        const minQty =() => {
            if(qty.value > 1){
                qty.value -= 1
            }
        }

        
        const customer =  (e) => {
            customerId.value = e.target.value
        }

        const item = (e) => {
            data_items.value = e.target.value
        }
        
        const addSales = () => {
            if(data_items.value.length < 1){
                alert('MASUKAN DATA DENGAN BENAR')
            } else {
                const form = new FormData()
                form.append('customer_id', customerId.value)
                form.append('qty', qty.value)
                form.append('item_id', data_items.value)
                store.dispatch('addSales', form)
            }
        }

        const customers = computed(() => {
            return store.state.customers
        })
        const items = computed(() => {
            return store.state.items
        })

        onMounted(() => {
            store.dispatch('getItems')
            store.dispatch('getCustomers')
        })

        return { qty, addQty, minQty, item, addSales, statusSales, customers, items, customer,data_items, customerId }
    },
}
</script>