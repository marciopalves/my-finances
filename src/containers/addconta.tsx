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
          nome: "Banco do Brasil",
          conta: 1209,
          descricao: "Minha conta salário",
          saldo: 100,
          transacoes: [
            {
              tipo: "credito",
              nome: "Salário",
              data: new Date(),
              valor: 3500
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
              tipo: "credito",
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
          descricao: "Minha popanca na Caixa",
          saldo: 800,
          transacoes: [
            {
              tipo: "credito",
              nome: "Depósito",
              data: new Date(),
              valor: 300
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