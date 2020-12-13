<template>
    <div>
        <h3 class="my-3 mx-4">{{ this.usernameCa}}</h3>
        <div class="w-100">
            <div class="row m-2">
                <div class="col-sm-6 col-md-3" v-for="(producto, id) in productos" :key="id">
                    <Productos :producto="producto"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import Productos from "@/components/ProductosMi.vue";

    export default {
        name: 'Catalogo',
        components: {
            Productos,
        },
        data() {
            return {
                productos: [],
                usernameCa: localStorage.getItem('usernameCa')
            }
        },
        mounted() {
            this.catalogoUser()
        },
        methods: {
            catalogoUser() {
                axios.get('http://localhost:1337/productos', {
                    params: {
                        disponible: true,
                        'user.id_eq': parseInt(localStorage.getItem('userId')),
                    }
                }).then((response) => {
                    // console.log(response.data)
                    this.productos = response.data;
                })
            },
        }
    }
</script>