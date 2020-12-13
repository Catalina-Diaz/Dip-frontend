<template>
    <div class="w-100">
        <div class="d-flex my-3 mx-4">
            <h3 class="">Mi catalogo: </h3>
            <div>
                <button type="button" class="btn btn-primary mx-2 " data-toggle="modal" data-target="#staticProducto">
                    Agregar producto
                </button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#statiCategoria">
                    Agregar categoria
                </button>
            </div>
        </div>
    </div>
    <div class="w-100">
        <div class="row m-2">
            <div class="col-sm-6 col-md-3" v-for="(producto, id) in productos" :key="id">
                <Productos :producto="producto"/>
            </div>
        </div>
    </div>
    <!--Modal producto-->
    <div class="modal fade" id="staticProducto" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Agregar producto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> 
          </div>
          <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input v-model="nombre" type="text" class="form-control" id="nombre" required>
                </div>
                <!--imagen pro-->
                <div class="custom-file">
                    <input @change="cambiarImagen()" type="file" class="custom-file-input" id="selimagenpro" lang="es">
                    <label class="custom-file-label" for="customFileLang">Seleccionar Imagen</label>
                </div>
                <!--descripcion pro-->
                <div class="form-group">
                    <label for="descripcion1"></label>
                    <textarea v-model="descripcion" class="form-control" placeholder="Descripcion" id="descripcion1" rows="4"></textarea>
                </div>
                <!--categoria pro-->
                <div class="row form-group">
                    <div class="col-auto">
                    <label for="inputState">Categoria</label> 
                    </div>
                    <div class="col-auto px-3">
                    <select id="selected" v-model="selectedTag" class="custom-select" >
                      <option v-for="tag in tags" :key="tag.id" :value="tag.id">
                        {{ tag.nombre }}
                      </option>
                  </select>
                    </div>

                    
                </div>
                <!--radio-->
                <fieldset class="form-group">
                    <div class="row align-items-center">
                    <legend class="col-form-label col-sm-2 pt-0"></legend>

                    <div class="col-auto mb-2 px-2">
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
                        <label class="form-check-label" for="gridRadios1">
                            Activo
                        </label>
                        </div>
                    </div>
                    <div class="col-auto px-3">
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                        <label class="form-check-label" for="gridRadios2">
                            Inactivo
                        </label>
                        </div>
                    </div>
                    </div>
                </fieldset>
                <!--precio-->
                <input v-model="precio" class="form-control form-control-sm" id="preciopr" type="number" placeholder="Precio">
            </form>
          </div>

          <div class="modal-footer d-flex justify-content-center align-items-center">
            <button @click="agregarProducto()" type="button" class="btn btn-success">Agregar</button>
          </div>
        </div>
      </div>
    </div>
    <!--Fin-->

    <!--Modal categoria-->
    <div class="modal fade" id="statiCategoria" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Agregar categoria</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> 
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="nomcat">Nombre</label>
                <input type="text" class="form-control" id="nomcat" placeholder="Categoria">
              </div>
              <!--imagen categ-->
              <label for="imacat">Imagen Categoria</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="selimagencat" lang="es">
                <label class="custom-file-label" for="customFileLang">Seleccionar Imagen</label>
              </div>
               <!--descripcion cat-->
              <div class="form-group">
                <label for="descripcion2"></label>
                <textarea class="form-control" placeholder="Describe la categoria" id="descripcion2" rows=2></textarea>
              </div>
            </form>
          </div>

          <div class="modal-footer d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-success">Agregar</button>
            <button type="button" class="btn btn-danger">Calcelar</button>
          </div>
        </div>
      </div>
    </div>
    <!--Fin-->
</template>
<script>
    import axios from "axios";
    import Productos from "@/components/ProductosMi.vue";

    export default {
        name: 'MiCatalogo',
        components: {
            Productos,
        },
        data() {
            return {
                productos: [],
                tags: [],
                nombre: '',
                descripcion: '',
                categoria: '',
                activo: true,
                precio: '',
                selectedTag: ''
            }
        },
        mounted() {
            this.traerMiCatalogo();
            this.traerTags();
        },
        methods: {
            traerMiCatalogo() {
                axios.get('http://localhost:1337/productos/me' , {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                }).then((response) => {
                    this.productos = response.data;
                })
            },
            traerTags() {
                axios.get('http://localhost:1337/tags/me' , {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                }).then((response) => {
                    this.tags = response.data;
                })
            },
            agregarProducto() {
                let formData = new FormData();
                formData.append('files.imagen', this.imagenProd);
                formData.append('data', JSON.stringify({
                    tag: this.selectedTag,
                    nombre: this.nombre,
                    descripcion: this.descripcion,
                    precio: this.precio,
                    disponible: this.activo,
                    user: parseInt(localStorage.getItem('userIdL')),
                }))
                axios.post('http://localhost:1337/productos', formData, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                }).then((response) => {
                    console.log(response.data)
                    location.reload();
                })
            },
            cambiarImagen() {
                this.imagenProd = event.target.files[0];
            },
        }
    }
</script>
