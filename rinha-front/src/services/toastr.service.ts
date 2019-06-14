import Vue from "vue";

class ToastrService {
    constructor() {

    }

    obterToastr(codigo: number): any {
        let div = codigo / 100;
        let code = parseInt(div.toString());

        console.log('ta la', codigo, ' ', code);
        if (code == 1) {
            return {
                message: "Requisição efetuada com sucesso, porém com alguma treta",
                type: "is-warning",
                position: "is-top",
                actionText: "Ver Mais",
                indefinite: true
            }
        }
        if (code == 2 || code == 3) {
            return {
                message: "Requisição efetuada com sucesso!",
                type: "is-success",
                position: "is-top",
                actionText: "Ver Mais",
                indefinite: true
            }
        }
        return {
            message: "Deu ruim, algo de errado não está certo!",
            type: "is-danger",
            position: "is-top",
            actionText: "Ver Treta",
            indefinite: true
        }
    }
}

export const toastr = new ToastrService();