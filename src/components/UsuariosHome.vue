<template>
    <div class="card mb-3" style="">
        <img :src="'http://localhost:1337'+user.imagen_usuario.imagen.url" class="card-img-top" alt="">
        <div class="card-body px-2 pt-2 pb-1">
            <h5 class="card-title">{{user.username}}</h5>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        name: 'UsuariosHome',
        props: ['user'],//en propiedades, recibe un array
    }
</script>
