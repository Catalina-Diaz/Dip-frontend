<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <i class="fab fa-angellist"></i>
        <a class="navbar-brand" href="#">Hidden brand</a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <button type="button" class="btn btn-primary mr-3 " data-toggle="modal" data-target="#staticBackdrop">
            Registrarse
          </button>
          <button type="button" class="btn btn-success mr-3 " data-toggle="modal" data-target="#staticBackdropo">
            Ingresar
          </button>
        </form>
      </div>
    </nav>

    <!-- Modal Registro-->
    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">REGISTRARME</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> 
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="username">Nombre de establecimiento</label>
                <input type="text" class="form-control" id="username" required>
              </div>
              <div class="form-group">
                <label for="file">Imagen del establecimiento</label>
                <input style="border: 0" type="file" class="form-control" id="file">
              </div>
              <div class="form-group">
                <label for="email">Correo electronico</label>
                <input type="email" class="form-control" id="email" required>
              </div>
              <div class="form-group">
                <label for="tel">Telefono</label>
                <input type="number" class="form-control" id="tel" required>
              </div>
              <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" class="form-control" id="password" required>
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-primary">Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal inicio sesion-->
  <div class="modal fade" id="staticBackdropo" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">INICIAR SESION</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button> 
        </div>

        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="email">Correo electronico</label>
              <input type="email" class="form-control" id="email" required>
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input type="password" class="form-control" id="password" required>
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-center align-items-center">
          <button type="button" class="btn btn-success">Ingresar</button>
        </div>
      </div>
    </div>
  </div>

  <router-view/>
</template>

<script>
  export default {
    
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
