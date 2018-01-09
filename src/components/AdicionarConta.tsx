import * as React from 'react';
import { Conta } from '../models/Conta';
import { Transacao } from '../models/Transacao';

export default interface MyProps {
    adicionarConta: (conta: Conta) => {};
}

export class AdicionarConta extends React.Component<MyProps, {}> {

    handleSubmit(e: any) {
        const inputNome = (this.refs['nome'] as any as HTMLInputElement)
        const inputConta = (this.refs['conta'] as any as HTMLInputElement)

        const nome = inputNome.value.trim();
        const conta = inputConta.value.trim();

        if (nome === '') {
            alert('Nome é um campo obrigatório');
        }

        if (conta === '') {
            alert('Conta é um campo obrigatório');
        }

        let contaNumber = parseInt(conta)

        let novaConta = new Conta(new Date().getTime(), nome, contaNumber, 0, new Array<Transacao>())
        this.props.adicionarConta(novaConta);

        e.preventDefault();

        inputNome.value = ''
        inputConta.value = ''
    }

    render() {
        return (
            <div>
                <h1>Adicionar Conta</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Descrição</label><br />
                        <input type="text" ref="nome" />
                    </div>
                    <div>
                        <label>Conta</label><br />
                        <input type="text" ref="conta" />
                    </div>
                    <br />
                    <input type="submit" value="Criar Conta" />
                </form>
            </div>
        );
    }
}

