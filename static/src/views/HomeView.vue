<template>
  <div class="md-layout">
    <md-content>
    <FuncionariosView></FuncionariosView>
    <ProdutosView></ProdutosView>
    </md-content>
  </div>
</template>

<script>
  import ProdutosView from './ProdutosView.vue'
  import FuncionariosView from './FuncionariosView.vue'

  export default {
    components: {
      ProdutosView,
      FuncionariosView
    }
  }
</script>

<style scoped>
  .md-content {
    width:80%;
    margin: 0 auto;
  }
</style>
