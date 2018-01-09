import * as React from 'react';
import { Transacao } from '../models/Transacao';

export default interface MyProps {
    adicionarTransacao: (conta: number, transacao: Transacao) => {};
}

export class AdicionarTransacao extends React.Component<MyProps, {}> {

    handleSubmit(e: any) {
        const inputNome = (this.refs['nome'] as any as HTMLInputElement)
        const inputConta = (this.refs['conta'] as any as HTMLInputElement)
        const inputValor = (this.refs['valor'] as any as HTMLInputElement)
        const inputCheckbox = (this.refs['credito'] as any as HTMLInputElement)

        const nome = inputNome.value.trim();
        const conta = inputConta.value.trim();
        const valor = inputValor.value.trim();
        const isCredito = inputCheckbox.checked;

        if (nome === '') {
            alert('Nome é um campo obrigatório');
        }

        if (conta === '') {
            alert('Conta é um campo obrigatório');
        }

        if (valor === '') {
            alert('Valor é um campo obrigatório');
        }

        let contaNumber = parseInt(conta)
        let valorNumber = parseInt(valor)

        let transacao = new Transacao(isCredito, nome, new Date(), valorNumber)
        this.props.adicionarTransacao(contaNumber, transacao);

        e.preventDefault();

        inputNome.value = ''
        inputConta.value = ''
        inputValor.value = ''
    }

    render() {
        return (
            <div>
                <h1>Adicionar Transação</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Descrição</label><br />
                        <input type="text" ref="nome" />
                    </div>
                    <div>
                        <label>Conta</label><br />
                        <input type="text" ref="conta" />
                    </div>
                    <div>
                        <label>Valor</label><br />
                        <input type="text" ref="valor" />
                    </div>
                    <br />
                    <div>
                        <label>Crédito: </label><br />
                        <input type="checkbox" ref="credito" />
                        <br />
                    </div>
                    <input type="submit" value="Lançar transação" />
                    <br />
                </form>
            </div>
        );
    }
}

