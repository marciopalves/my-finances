import * as React from 'react';
import { ResumoConta } from '../components/ResumoConta';
import { Conta } from '../models/Conta';
import '../App.css';
import '../css/pure-min.css';
import '../css/side-menu.css';

class Home extends React.Component<{}, { contas: Conta[], contasTemp: Conta[], filtrando: boolean }> {

  componentWillMount() {
    this.state = {
      filtrando: false,
      contasTemp: [],
      contas: [
        {
          id: 1,
          nome: "Banco Original",
          conta: 1249,
          descricao: "Minha conta salário",
          saldo: 1000,
          transacoes: [
            {
              tipo: "credito",
              nome: "Freela",
              data: new Date(),
              valor: 800
            }
          ]
        },
        {
          id: 2,
          nome: "Easy Invest",
          conta: 3212,
          descricao: "Minha conta de Investimentos",
          saldo: 3000,
          transacoes: [
            {
              tipo: "credito",
              nome: "Tesouro-Direto",
              data: new Date(),
              valor: 1200
            },
            {
              tipo: "credito",
              nome: "Renda-fixa",
              data: new Date(),
              valor: 500
            }
          ]
        },
        {
          id: 3,
          nome: "Banco do Brasil",
          conta: 3271,
          descricao: "Conta Corrente",
          saldo: 3000,
          transacoes: [
            {
              tipo: "debito",
              nome: "saque",
              data: new Date(),
              valor: 1200
            },
            {
              tipo: "credito",
              nome: "deposito",
              data: new Date(),
              valor: 500
            }
          ]
        }
      ]
    }
  }

  handleLimparFiltros() {
    this.setState({ contas: this.state.contasTemp, contasTemp: this.state.contasTemp, filtrando: false })
  }

  handleFiltrar(nome: String, valorI:number, valorF:number, dateI:string, dateF:string) {
    const contasTemp = new Array<Conta>()
    var contasFiltradas = this.state.contas

    if (this.state.contasTemp.length == 0) {
      for (let conta of this.state.contas) {
        contasTemp.push(conta)
      }
    } else {
      for (let conta of this.state.contasTemp) {
        contasTemp.push(conta)
      }
    }

    if (contasFiltradas.length > 0) {
      if (nome != '') {
        contasFiltradas = contasFiltradas.filter(c => c.nome == nome)
      }

      if (valorI != -1 && valorF != -1) {
        contasFiltradas[0].transacoes = contasFiltradas[0].transacoes.filter(valorObj => valorObj.valor >= valorI && valorObj.valor <= valorF)
      }

      if(dateI != '' && dateF != ''){
        contasFiltradas[0].transacoes = contasFiltradas[0].transacoes.filter(dateObj => dateObj.data.toLocaleDateString().toString() >= dateI && dateObj.data.toLocaleDateString().toString() <= dateF)
      }
    }

    this.setState({ contas: contasFiltradas, contasTemp: contasTemp, filtrando: true })
  }

  render() {
    return (
        <div className="">
          <ResumoConta contas={this.state.contas} filtrando={this.state.filtrando}
            filtrar={this.handleFiltrar.bind(this)} limparFiltros={this.handleLimparFiltros.bind(this)} />
        </div>
    );
  }
}
export default Home;