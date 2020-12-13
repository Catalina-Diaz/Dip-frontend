<template>
  <div>
    <!-- contenedor Usuarios -->
    <div v-if="userData">
      <h3 class="ml-4 my-3">Establecimientos:</h3>
      <!-- Usuarios -->
      <div class="row m-2">
        <div @click="next(user.id)" class="col-sm-6 col-md-3" v-for="(user, id) in usuarios" :key="id">
          <div class="card mb-3" style="">
            <img :src="'http://localhost:1337'+user.imagen_usuario.imagen.url" class="card-img-top" alt="">
            <div class="card-body px-2 pt-2 pb-1">
              <h5 class="card-title">{{user.username}}</h5>
            </div>
          </div>
        </div>
      </div>
      <!-- End, Usuarios -->
    </div>
    <!-- End, contenedor Usuarios -->

    <!-- sin usuarios -->
    <div v-if="userVacios">
      <h3 class="ml-4 mt-3">Sin establecimientos registrados...</h3>
    </div>
    <!-- End, sin usuarios -->
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name: 'Home',
    data() {
      return {
        usuarios: [],
        userVacios: false,
        userData: false,
      }
    },
    mounted() {
      if(localStorage.getItem('ifregistro')){
        this.ifregistro = false;
      }
      if(localStorage.getItem('iflogin')){
        this.iflogin = false;
      }
      if(localStorage.getItem('iflogin')){
        this.ifsalir = true;
      }
      this.traerUsuarios(); 
    },
    methods: {
      traerUsuarios() {
        axios.get("http://localhost:1337/users", {
          params: {
            confirmed: true,
          }}).then((response) => {
            this.usuarios = response.data;
            if(this.usuarios) {
              this.userVacios = false;
              this.userData = true;
            } else {
              this.userVacios = true;
              this.userData = false;
            }
        }).catch((error) => {
          this.userVacios = true;
          this.userData = false;
        });
      },
      next(userId) {
        localStorage.setItem('userId', userId);
        console.log(userId);
      },
    }
  }
</script>


<style>
.navbar{
  background: rgb(212, 177, 221);
  
}
</style>