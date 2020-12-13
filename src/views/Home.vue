<template>
  <div>
    <!-- contenedor Usuarios -->
    <div v-if="userData">
      <h3 class="ml-4 my-3">Establecimientos: </h3>
      <!-- Usuarios -->
      <div class="row m-2">
        <div @click="next(user.username, user.id)" class="col-sm-6 col-md-3" v-for="(user, id) in usuarios" :key="id">
          <UsuariosHome :user="user"/>
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
  import UsuariosHome from "@/components/UsuariosHome.vue";

  export default {
    name: 'Home',
    components: {
      UsuariosHome,
    },
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
      next(username, id) {
        localStorage.setItem('usernameCa', username);
        this.$router.push('/Catalogo/'+username);
        localStorage.setItem('userId', id);
      },
    }
  }
</script>


<style>
.navbar{
  background: rgb(212, 177, 221);
  
}
</style>