import { createStore } from "vuex"
import axios from "axios"
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://127.0.0.1:8000/api/"

export const store = createStore({
    state: {
        items: [],
        statusItem: false,
        flashItem: "",
        customers: [],
        statusCustomer: false,
        flashCustomer: "",
        sales: [],
        statusSales: false,
        flashSales: "",
    },
    mutations: {
        setItems(state, payload){
            state.items = payload
        },
        setStatusItem(state,payload){
            state.statusItem = payload
        },
        setFlashItem(state, payload){
            state.flashItem = payload
        },
        setCustomers(state, payload){
            state.customers = payload
        },
        setStatusCustomer(state,payload){
            state.statusCustomer = payload
        },
        setFlashCustomer(state, payload){
            state.flashCustomer = payload
        },
        setSales(state, payload){
            state.sales = payload
        },
        setStatusSales(state,payload){
            state.statusSales = payload
        },
        setFlashSales(state, payload){
            state.flashSales = payload
        },
    },
    actions: {
        getItems({ commit }){
            axios.get('items')
            .then(response => {
                commit('setItems', response.data.data)
            })
            .catch(() => {
                alert('Error Get Items')
            })
        },
        addItem({ commit }, data){
            axios.post('items', data)
            .then(response => {
                if(response.data.status){
                    alert('berhasil tambah data')
                    commit('setStatusItem', true)
                } else {
                    alert('data tidak valid')
                }
            })
            .catch(() => {
                alert('Error Add Items')
            })
        },
        deleteItem({ commit }, data){
            axios.delete(`items/${data.kode_item}`)
            .then(response => {
                if(response.data.status){
                    commit('setFlashItem', response.data.message)
                    commit('setStatusItem', true)
                } else {
                    alert(response.data.message)
                }
            })
        },
        getCustomers({ commit }){
            axios.get('customers')
            .then(response => {
                commit('setCustomers', response.data.data)
            })
            .catch(() => {
                alert('Error Get Customers')
            })
        },
        addCustomer({ commit }, data){
            axios.post('customers', data)
            .then(response => {
                if(response.data.status){
                    alert('berhasil tambah data')
                    commit('setStatusCustomer', true)
                } else {
                    alert('data tidak valid')
                }
            })
            .catch(() => {
                alert('Error Add Customer')
            })
        },
        deleteCustomer({ commit }, data){
            axios.delete(`customers/${data.email}`)
            .then(response => {
                if(response.data.status){
                    commit('setFlashCustomer', response.data.message)
                    commit('setStatusCustomer', true)
                } else {
                    alert(response.data.message)
                }
            })
        },
        getSales({ commit }){
            axios.get('sales')
            .then(response => {
                commit('setSales', response.data.data)
            })
            .catch(() => {
                alert('Error Get Sales')
            })
        },
        addSales({ commit }, data){
            axios.post('sales', data)
            .then(response => {
                if(response.data.status){
                    alert('berhasil tambah data')
                    commit('setStatusSales', true)
                } else {
                    alert('data tidak valid')
                }
            })
            .catch(() => {
                alert('Error Add Sales')
            })
        },
        deleteSales({ commit }, data){
            axios.delete(`sales/${data.code_transaksi}`)
            .then(response => {
                console.log(response)
                if(response.data.status){
                    commit('setFlashSales', response.data.message)
                    commit('setStatusSales', true)
                } else {
                    alert(response.data.message)
                }
            })
        },
    }
})