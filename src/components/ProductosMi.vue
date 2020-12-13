<template>
    <div class="card mb-3" style="">
        <img :src="'http://localhost:1337'+producto.imagen.url" class="card-img-top" alt="">
        <div class="card-body px-2 pt-2 pb-1">
            <h5 class="card-title">{{producto.nombre}}</h5>
        </div>
    </div>
</template>
<script>
    import axios from "axios";

    export default {
        name: 'ProductosMi',
        props: ['producto'],//en propiedades, recibe un array
    }
</script>
