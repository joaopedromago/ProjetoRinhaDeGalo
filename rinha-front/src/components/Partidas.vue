<template>
  <div>
    <b-modal :active.sync="exibirModal">
      <p class="image is-4by3">
        <img :src="fotoModal">
      </p>
    </b-modal>
    <section class="hero is-info is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <img src="@/assets/rinha.jpg">
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { toastr } from "../services/toastr.service";

@Component({
  components: {}
})
export default class Partidas extends Vue {
  public exibirModal = false;
  public fotoModal = "";

  mounted() {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then(response => {
        this.requisicaoEfetuada(response.status);
        console.log(response);
      });
  }

  requisicaoEfetuada(codigo: number) {
    let dados = toastr.obterToastr(codigo);
    this.fotoModal = "https://http.cat/" + codigo;

    this.$snackbar.open({
      message: dados.message,
      type: dados.type,
      position: dados.position,
      actionText: dados.actionText,
      indefinite: dados.indefinite,
      onAction: () => {
        this.exibirModal = true;
      }
    });
  }
}
</script>
