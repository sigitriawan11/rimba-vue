import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "./../components/Dashboard.vue"
import Home from "./../components/Home.vue"
import Customer from "./../components/Customer.vue"
import Item from "./../components/Item.vue"
import Sales from "./../components/Sales.vue"
import AddItem from "./../components/Item/AddItem.vue"
import AddCustomer from "./../components/Customer/AddCustomer.vue"
import AddSales from "./../components/Sales/AddSales.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Dashboard",
            component: Dashboard,
            children: [
                {
                    path: "",
                    name: "Home",
                    component: Home
                },
                {
                    path: "items",
                    name: "Item",
                    component: Item
                },
                {
                    path: "items/add",
                    name: "AddItem",
                    component: AddItem
                },
                {
                    path: "customers",
                    name: "Customer",
                    component: Customer
                },
                {
                    path: "customers/add",
                    name: "AddCustomer",
                    component: AddCustomer
                },
                {
                    path: "sales",
                    name: "Sales",
                    component: Sales
                },
                {
                    path: "sales/add",
                    name: "AddSales",
                    component: AddSales
                },
            ]
        }
    ]
})

export default router