import * as React from 'react';
import { Conta } from '../models/Conta';
import '../App.css';
import { AdicionarTransacao } from '../components/AdicionarTransacao';
import { Transacao } from '../models/Transacao';
import '../css/pure-min.css';
import '../css/side-menu.css';

class AddTransacao extends React.Component<{}, { contas: Conta[], contasTemp: Conta[], filtrando: boolean }> {

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
          saldo: 800,
          transacoes: [
            {
              tipo: "Crédito",
              nome: "Bitcoin",
              data: new Date(),
              valor: 300
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
      ]
    }
  }


  handleAdicionarTransacao(conta: string, transacao: Transacao) {
    let myContas = this.state.contas
    let match = false
    for (let i = 0; i < myContas.length; i++) {
      // Conta existe?
      if (myContas[i].nome == conta) {
        myContas[i].transacoes.push(transacao);
        match = true

        // computar saldo
        let saldo: number = 0
        for (let j = 0; j < myContas[i].transacoes.length; j++) {
          console.log('teste', myContas[i].transacoes[j].tipo)
          if (myContas[i].transacoes[j].tipo == "credito" || myContas[i].transacoes[j].tipo == "Crédito") {
            saldo += myContas[i].transacoes[j].valor
          } else {
            saldo -= myContas[i].transacoes[j].valor
          }
        }

        // Atualizar o saldo
        myContas[i].saldo = saldo
      }
    }

    if (match) {
      this.setState({ contas: myContas })
    } else {
      alert('Conta inexistente')
    }
  }

  handleLimparFiltros() {
    this.setState({ contas: this.state.contasTemp, contasTemp: this.state.contasTemp, filtrando: false })
  }

  handleFiltrar(nome: String, conta: number) {
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

      if (conta != -1) {
        contasFiltradas = contasFiltradas.filter(c => c.conta == conta)
      }
    }

    this.setState({ contas: contasFiltradas, contasTemp: contasTemp, filtrando: true })
  }

  render() {
    return (
        <div className="">
          <AdicionarTransacao adicionarTransacao={this.handleAdicionarTransacao.bind(this)} contas={this.state.contas}/>
        </div>
    );
  }
}
export default AddTransacao;