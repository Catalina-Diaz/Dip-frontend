<template>
  <!-- Contenedor principal -->
  <div class="w-100">
    <!-- Barra de navegacion -->
    <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #6B4BF9;">
      <a class="navbar-brand" href="#">
        <img src="@/assets/iconos/Gallery.png" width="30" height="30" class="d-inline-block align-top" alt="icono" loading="lazy" draggable="false">
        <span class="ml-1 h4">Catalogos en linea</span>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <form class="form-inline my-2 my-lg-0">
            <button type="button" class="btn btn-success mr-3" data-toggle="modal" data-target="#staticBackdrop">
              Registrarme
            </button>
            <button type="button" class="btn btn-light mr-3 " data-toggle="modal" data-target="#staticBackdropo">
              Ingresar
            </button>
          </form>
        </ul>
        
      </div>
    </nav>
    <!-- End, Barra de navegacion -->
  </div>
  <!-- End, Contenedor principal -->

  <!-- Modal Registro-->
  <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Registrarme</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> 
        </div>

        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="username">Nombre de establecimiento</label>
              <input v-model="username" type="text" class="form-control" id="username" required>
            </div>
            <div class="form-group">
              <label for="file">Imagen representante</label>
              <input @change="cambiarImagen()" style="border: 0," type="file" class="form-control p-0" id="file" >
            </div>
            <div class="form-group">
              <label for="email">Correo electronico</label>
              <input v-model="email" type="email" class="form-control" id="email" required>
            </div>
            <div class="form-group">
              <label for="tel">Telefono</label>
              <input v-model="telefono" type="number" class="form-control" id="tel" required>
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input v-model="password" type="password" class="form-control" id="password" required>
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-center align-items-center">
          <button @click="registro()" type="button" class="btn btn-primary">Registrarse</button>
        </div>
      </div>
    </div>
  </div>
  <!-- End, Modal Registro-->

  <!-- Modal inicio sesion-->
  <div class="modal fade" id="staticBackdropo" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Ingresar</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> 
        </div>

        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="lemail">Correo electronico</label>
              <input type="email" v-model="l_email" class="form-control" id="lemail" required>
            </div>
            <div class="form-group">
              <label for="l_password">Contraseña</label>
              <input type="password" v-model="l_password" class="form-control" id="l_password" required>
            </div>
          </form>
        </div>

        <div class="modal-footer d-flex justify-content-center align-items-center">
          <button @click="login()" type="button" class="btn btn-primary">Ingresar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- End, Modal inicio sesion-->

  <router-view/>
</template>

<script>
  import axios from "axios";

  export default {
    data() {
      return {
        usuarios: [],
        username: '',
        userImagen: null,
        email: '',
        telefono: '',
        password: '',
        l_email: '',
        l_password: '',
      }
    },
    mounted() {
    this.traerUsuarios();  
    },
    methods: {
      traerUsuarios() {
        axios.get("http://localhost:1337/users", {
          params: {
            confirmed: true,
          }}).then((response) => {
            this.usuarios = response.data;
            this.usuarios.forEach((user) => {
              console.log(user.username)
            })
        });
      },
      registro() {
        axios.post("http://localhost:1337/auth/local/register", {
          username: this.username,
          email: this.email,
          telefono: this.telefono,
          password: this.password,
        }).then((response) =>{
          console.log(response.data);
          console.log(response.data.user.id);
          let formData = new FormData();
          formData.append('files.imagen', this.userImagen);
          formData.append('data', JSON.stringify({
            user: parseInt(response.data.user.id),
          }));
          axios.post("http://localhost:1337/imagen-usuarios", formData).then((response) => {
            console.log('Ok');
          });
        });
      },
      login() {
        axios.post("http://localhost:1337/auth/local", {
              identifier: this.l_email,
              password: this.l_password,
        }).then((response) =>{
          console.log('Ok');
        })
      },
      cambiarImagen() {
        this.userImagen = event.target.files[0];
      }
    }

  }
</script>


<style>

</style>
