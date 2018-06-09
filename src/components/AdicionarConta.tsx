import * as React from 'react';
import { Conta } from '../models/Conta';
import { Transacao } from '../models/Transacao';

export default interface MyProps {
    adicionarConta: (conta: Conta) => {};
}

export default interface Props {
  contas: Conta[];
}


export class AdicionarConta extends React.Component<MyProps, {}> {

    handleSubmit(e: any) {
        const inputNome = (this.refs['nome'] as any as HTMLInputElement)
        const inputConta = (this.refs['conta'] as any as HTMLInputElement)
        const inputDescricao = (this.refs['descricao'] as any as HTMLInputElement)
        const inputSaldoInicial = (this.refs['saldostart'] as any as HTMLInputElement)

        const nome = inputNome.value.trim();
        const conta = inputConta.value.trim();
        const descricao = inputDescricao.value.trim();
        const saldo = parseInt(inputSaldoInicial.value.trim());

        if (nome === '') {
            alert('Nome é um campo obrigatório');
        }

        if (conta === '') {
            alert('Conta é um campo obrigatório');
        }

        let contaNumber = parseInt(conta)

        let novaConta = new Conta(new Date().getTime(), nome, contaNumber, descricao, saldo, new Array<Transacao>())
        this.props.adicionarConta(novaConta);

        e.preventDefault();

        inputNome.value = ''
        inputConta.value = ''
        inputDescricao.value = ''
        inputSaldoInicial.value = ''
    }

    render() {
        const { contas } = this.props;
        return (
            <div>
                <h1>Adicionar Conta</h1>
                <div className="content" id="content">
                    <div className="pure-form pure-form-aligned">
                        <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit.bind(this)}>
                            <table>
                                <tbody>
                                    <tr>
                                        <div className="pure-control-group">
                                            <td><label>Nome</label><input type="text" ref="nome" /></td>
                                            <td><label>Número da Conta</label><input type="text" ref="conta" /></td>
                                            <td><label>Descrição</label><input type="text" ref="descricao" /></td>
                                            <td><label>Saldo Inicial</label><input type="text" ref="saldostart" /></td>
                                        </div>
                                    </tr>
                                    <tr>
                                        <td><input type="submit" className="pure-button pure-button-primary" value="Criar Conta" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        {
                          contas.map(
                            (conta) => {
                              return <div key={conta.id}>
                                <div>
                                    <div className="header">
                                      <h2>{conta.nome}</h2>
                                    </div>         
                                    <table className="pure-table">
                                        <thead>
                                            <tr>
                                                <th>Descrição</th><th>Saldo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{conta.descricao}</td><td>{conta.saldo}</td>                
                                            </tr>
                                        </tbody>
                                    </table> 
                                </div>
                              </div>
                            }
                          )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

