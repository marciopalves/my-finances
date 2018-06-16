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