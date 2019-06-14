<template>
  <div>
    <b-modal :active.sync="exibirModal">
      <p class="image is-4by3">
        <img :src="fotoModal">
      </p>
    </b-modal>
    <section class="hero is-info is-bold main-section">
      <div class="columns">
        <div class="column"></div>
        <div class="column"></div>
        <div class="column"></div>
        <div class="column">
          <b-button type="is-primary" v-on:click="cadastrar()">
            Cadastrar Novo Galo
            <i class="fa fa-plus"></i>
          </b-button>
        </div>
      </div>
    </section>
    <section class="hero is-info is-bold main-section">
      <b-field grouped group-multiline>
        <b-select v-model="defaultSortDirection">
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </b-select>
        <b-select v-model="perPage" :disabled="!isPaginated">
          <option value="5">Mostrar 5</option>
          <option value="10">Mostrar 10</option>
          <option value="15">Mostrar 15</option>
          <option value="20">Mostrar 20</option>
        </b-select>
        <!-- <div class="control">
          <button class="button" @click="currentPage = 2" :disabled="!isPaginated">Set page to 2</button>
        </div>-->
        <div class="control is-flex">
          <b-switch v-model="isPaginated">Limitar por páginas</b-switch>
        </div>
        <div class="control is-flex">
          <b-switch v-model="isPaginationSimple" :disabled="!isPaginated">Simplificado</b-switch>
        </div>
      </b-field>

      <b-table
        :data="galos"
        :paginated="true"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :default-sort-direction="defaultSortDirection"
        default-sort="nome"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column field="nome" label="Nome" sortable>{{ props.row.nome }}</b-table-column>
          <b-table-column field="idade" label="Idade" sortable>{{ props.row.idade }}</b-table-column>
          <b-table-column field="vitorias" label="Vitórias" sortable>{{ props.row.vitorias }}</b-table-column>
          <b-table-column field="poder" label="Nível de poder" sortable>{{ props.row.poder }}</b-table-column>
          <b-table-column field="acao" label="Ações">
            <b-button type="is-warning" v-on:click="alterar(props.row)">Alterar</b-button>
          </b-table-column>
        </template>
      </b-table>
    </section>
    <b-modal :active.sync="modalEdicao" :width="640" scroll="keep">
      <form>
        <div class="modal-card" style="width: auto">
          <header class="modal-card-head">
            <p class="modal-card-title">{{tituloModal}}</p>
          </header>
          <section class="modal-card-body">
            <b-field label="Nome">
              <b-input type="text" v-model="nomeGalo" placeholder="Nome do Galo" required></b-input>
            </b-field>
            <b-field label="Idade">
              <b-input type="number" v-model="idadeGalo" placeholder="Idade" required></b-input>
            </b-field>
            <b-field label="Poder">
              <b-input type="number" v-model="poderGalo" placeholder="Nível de Poder" required></b-input>
            </b-field>
            <b-field label="Vitórias">
              <b-input type="number" v-model="vitoriasGalo" placeholder="Vitórias" required></b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <button class="button" type="button" @click="modalEdicao = false">Fechar</button>
            <button class="button is-success" v-on:click="confirmar()">Confirmar</button>
          </footer>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { toastr } from "../services/toastr.service";

@Component({
  components: {}
})
export default class Galos extends Vue {
  public exibirModal = false;
  public modalEdicao = false;
  public fotoModal = "";
  public tituloModal = "";

  // form
  public idGalo: number = 0;
  public nomeGalo: string = "a";
  public idadeGalo: number = 0;
  public vitoriasGalo: number = 0;
  public poderGalo: number = 0;

  public galos: any = [];

  mounted() {
    this.carregarGalos();
  }

  data() {
    return {
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      currentPage: 1,
      perPage: 20
    };
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

  cadastrar() {
    this.limparFormulario();
    this.tituloModal = "Cadastro de Galo";
    this.modalEdicao = true;
    this.galos.push(this.galos[0]);
  }

  alterar(galo: any) {
    this.definirFormulario(galo);
    this.tituloModal = "Edição de Galo";
    console.log(galo);
    this.modalEdicao = true;
  }

  limparFormulario() {
    this.idGalo = 0;
    this.nomeGalo = "";
    this.idadeGalo = 0;
    this.vitoriasGalo = 0;
    this.poderGalo = 0;
  }

  definirFormulario(galo: any) {
    this.idGalo = galo.id;
    this.nomeGalo = galo.nome;
    this.idadeGalo = galo.idade;
    this.vitoriasGalo = galo.vitorias;
    this.poderGalo = galo.poder;
  }

  confirmar() {
    let galo: any = {
      id: this.idGalo,
      nome: this.nomeGalo,
      idade: this.idadeGalo,
      vitorias: this.vitoriasGalo,
      poder: this.poderGalo
    };
    if (galo.id > 0) {
      // request put
    } else {
      // request post
    }
    this.galos.push(galo);
    this.modalEdicao = false;
  }

  carregarGalos() {
    // request get
    this.galos = [
      { nome: "vgalo maluco", idade: "2", vitorias: "1", poder: "9,5" },
      { nome: "galo maluco", idade: "3", vitorias: "4", poder: "9,5" },
      { nome: "zgalo maluco", idade: "1", vitorias: "1", poder: "10" }
    ];
  }
}
</script>
