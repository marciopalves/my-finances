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
          nome: "Banco do Brasil",
          conta: 1209,
          descricao: "Minha conta salário",
          saldo: 100,
          transacoes: [          
            {
              tipo: "Crédito",
              nome: "Salário",
              data: new Date(),
              valor: 3500
            },
            {
              tipo: "Crédito",
              nome: "Freelancer",
              data: new Date(),
              valor: 1500
            }
          ]
        },
        {
          id: 2,
          nome: "Original",
          conta: 1268,
          descricao: "Minha conta corrente no Banco Original",
          saldo: 1200,
          transacoes: [
            {
              tipo: "Crédito",
              nome: "Depósito",
              data: new Date(),
              valor: 300
            }
          ]
        }
		{
          id: 3,
          nome: "Caixa Poupanca",
          conta: 1002,
          descricao: "Minha poupanca na Caixa",
          saldo: 800,
          transacoes: [
            {
              tipo: "Crédito",
              nome: "Depósito",
              data: new Date(),
              valor: 300
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