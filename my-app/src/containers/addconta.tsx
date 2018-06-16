import * as React from 'react';
import { AdicionarConta } from '../components/AdicionarConta';
import { Conta } from '../models/Conta';
import '../App.css';
import '../css/pure-min.css';
import '../css/side-menu.css';

class AddConta extends React.Component<{}, { contas: Conta[], contasTemp: Conta[]}> {

  componentWillMount() {
    this.state = {
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

  handleAdicionarConta(novaConta: Conta) {
    let myContas = this.state.contas
    let match = false

    for (let i = 0; i < myContas.length; i++) {
      // Conta existe?
      if (myContas[i].conta === novaConta.conta || novaConta.id === myContas[i].id) {
        match = true
        break
      }
    }

    if (!match) {
      myContas.push(novaConta);
      this.setState({ contas: myContas })
    } else {
      alert('Conta já existente')
    }
  }

  render() {
    return (
        <div className="">
          <AdicionarConta adicionarConta={this.handleAdicionarConta.bind(this)} contas={this.state.contas}/>
        </div>
    );
  }
}
export default AddConta;