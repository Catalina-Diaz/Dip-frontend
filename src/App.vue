<template>
  <!-- Contenedor principal -->
  <div class="w-100">
    <!-- Barra de navegacion -->
    <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #640ABA;">
      <a class="navbar-brand" @click="reset()">
        <img src="@/assets/iconos/Gallery.png" width="35" height="35" class="d-inline-block align-top" alt="icono" loading="lazy" draggable="false">
        <span class="ml-1 h4">Catalogos en linea</span>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button v-if="ifregistro" type="button" class="btn btn-success mr-3" data-toggle="modal" data-target="#staticBackdrop">
            Registrarme
          </button>
          <button v-if="iflogin" type="button" class="btn btn-light mr-3 " data-toggle="modal" data-target="#staticBackdropo">
            Ingresar
          </button>
          <button v-if="ifmiCatg" @click="miCatg()"  type="button" class="btn btn-success mr-3">
            Mi catalogo
          </button>
          <button v-if="ifsalir" @click="salir()"  type="button" class="btn btn-light">
            Salir
          </button>
        </form>
        
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
            <div class="custom-file">
              <input @change="cambiarImagen()" type="file" class="custom-file-input" id="imgRegistro" lang="es">
              <label class="custom-file-label" for="customFileLang">Seleccionar Imagen</label>
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
        username: '',
        email: '',
        telefono: '',
        password: '',
        l_email: '',
        l_password: '',
        ifregistro: true,
        iflogin: true,
        ifmiCatg: false,
        ifsalir: false,
      }
    },
    mounted() {
      if(localStorage.getItem('ifregistro')){
        this.ifregistro = false;
      }
      if(localStorage.getItem('iflogin')){
        this.iflogin = false;
        this.ifsalir = true;
        this.ifmiCatg = true;
      }
    },
    methods: {
      registro() {
        axios.post("http://localhost:1337/auth/local/register", {
          username: this.username,
          email: this.email,
          telefono: this.telefono,
          password: this.password,
        }).then((response) =>{
          localStorage.setItem('ifregistro', false);
          let formData = new FormData();
          formData.append('files.imagen', this.userImagen);
          formData.append('data', JSON.stringify({
            user: parseInt(response.data.user.id),
          }));
          //Imagen del usuario
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
          console.log('login');
          localStorage.setItem('iflogin', false);
          localStorage.setItem('ifregistro', false);
          localStorage.setItem('userIdL', response.data.user.id);
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('username', response.data.user.username);
          location.reload();
        });
      },
      cambiarImagen() {
        this.userImagen = event.target.files[0];
      },
      miCatg() {
        this.$router.push('/MiCatalogo/'+localStorage.getItem('username'))
      },
      salir() {
        localStorage.removeItem('token');
        localStorage.removeItem('iflogin');
        localStorage.removeItem('ifregistro');
        localStorage.removeItem('userId');
        this.$router.push('/');
        location.reload();  
      },
      reset() {
        if(localStorage.getItem('userId')){
          localStorage.removeItem('userId');
        }
        this.$router.push('/');
      }
    }

  }
</script>


<style>

</style>
