import * as React from 'react';
import { Transacao } from '../models/Transacao';
import { Conta } from '../models/Conta';

export default interface MyProps {
    adicionarTransacao: (conta: string, transacao: Transacao) => {};
}

export default interface Props {
  contas: Conta[];
}

export class AdicionarTransacao extends React.Component<MyProps, {}> {

    handleSubmit(e: any) {
        const inputNome = (this.refs['nome'] as any as HTMLInputElement)
        const inputConta = (this.refs['conta'] as any as HTMLInputElement)
        const inputValor = (this.refs['valor'] as any as HTMLInputElement)
        const selectTipo = (this.refs['tipo'] as any as HTMLInputElement)

        const nome = inputNome.value.trim();
        const conta = inputConta.value.trim();
        const valor = inputValor.value.trim();
        const tipo = selectTipo.value;

        if (nome === '') {
            alert('Descrição é um campo obrigatório');
        }

        if (conta === '') {
            alert('Conta é um campo obrigatório');
        }

        if (valor === '') {
            alert('Valor é um campo obrigatório');
        }

        //let contaNumber = parseInt(conta)
        let valorNumber = parseInt(valor)

        let transacao = new Transacao(tipo, nome, new Date(), valorNumber)
        this.props.adicionarTransacao(conta, transacao);

        e.preventDefault();

        inputNome.value = ''
        inputConta.value = ''
        inputValor.value = ''
    }

    render() {
        const { contas } = this.props;
        return (
            <div>
                <h1>Adicionar Transação</h1>
                <div className="content" id="content">
                    <div className="pure-form pure-form-aligned">
                        <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit.bind(this)}>
                            <table>
                                <tbody>
                                    <tr>
                                        <div className="pure-control-group">
                                            <td>
                                                <label>Conta</label>
                                                <select ref='conta'>
                                                    {
                                                      contas.map(
                                                        (conta) => {
                                                            return <option value= {conta.nome}>{conta.nome}</option>
                                                        }
                                                      )
                                                    }
                                                </select>
                                            </td>
                                            <td><label>Valor</label><input type="text" ref="valor" /></td>
                                            <td>
                                                <label>Tipo</label>
                                                <select ref='tipo'>
                                                    <option value='credito'>Crédito</option>
                                                    <option value='debito'>Débito</option>
                                                </select>
                                            </td>
                                            <td><label>Descrição</label><input type="text" ref="nome" /></td>
                                        </div>
                                    </tr>
                                    <tr>
                                        <td><input type="submit" className="pure-button pure-button-primary" value="Lançar transação" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                        <h2>Últimas Transações</h2>
                        <table className="tableWidth">
                            <tr>
                                <td className="tdWidth" >Nome da conta</td>
                                <td className="tdWidth" >Numero da conta</td>
                                <td className="tdWidth" >Descrição</td>
                                <td className="tdWidth" >Tipo de operação</td>
                                <td className="tdWidth" >Data</td>
                                <td className="tdWidth" >Saldo</td>
                            </tr>
                        </table>
                        {
                          contas.map(
                            (conta) => {
                              return <div>
                                    {
                                      conta.transacoes.map(
                                        (transacao) => {
                                          return (
                                                <table className="tableWidth">
                                                    <td className="tdWidth" >{conta.nome}</td>
                                                    <td className="tdWidth" >{conta.conta}</td>
                                                    <td className="tdWidth" >{transacao.nome}</td>
                                                    <td className="tdWidth" >{transacao.tipo}</td>
                                                    <td className="tdWidth" >{transacao.data.toLocaleDateString()}</td>
                                                    <td className="tdWidth" >{conta.saldo}</td>
                                                </table>
                                          )
                                        }
                                      )
                                    }
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