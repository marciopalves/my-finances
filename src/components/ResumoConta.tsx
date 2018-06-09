import * as React from 'react';
import { Conta } from '../models/Conta';

export default interface Props {
  filtrando: boolean;
  contas: Conta[];
  filtrar: (nome: String, valorI:number, valorF:number, dateI:string, dateF:string) => {};
  limparFiltros: () => {};
}

export class ResumoConta extends React.Component<Props, {}> {

  handleLimparFiltros(e : any) {
    const inputNome = (this.refs['nome'] as any as HTMLInputElement)
    const inputValorInicial = (this.refs['valuestart'] as any as HTMLInputElement)
    const inputValorFinal = (this.refs['valueend'] as any as HTMLInputElement)
    const inputDateStart = (this.refs['datestart'] as any as HTMLInputElement)
    const inputDateEnd = (this.refs['datefinal'] as any as HTMLInputElement)

    inputNome.value = ''
    inputValorInicial.value = ''
    inputValorFinal.value = ''
    inputDateStart.value = ''
    inputDateEnd.value = ''

    this.props.limparFiltros();
    
    e.preventDefault()
  }

  handleSubmit(e: any) {
    const inputNome = (this.refs['nome'] as any as HTMLInputElement)
    const inputValorInicial = (this.refs['valuestart'] as any as HTMLInputElement)
    const inputValorFinal = (this.refs['valueend'] as any as HTMLInputElement)
    const inputDateStart = (this.refs['datestart'] as any as HTMLInputElement)
    const inputDateEnd = (this.refs['datefinal'] as any as HTMLInputElement)

    const nome = inputNome.value.trim();
    const valorI = inputValorInicial.value.trim();
    const valorF = inputValorFinal.value.trim();
    const dateI = inputDateStart.value.trim();
    const dateF = inputDateEnd.value.trim();

    const dateauxI = dateI.split("-");
    const dateInicial = dateauxI[2]+"/"+dateauxI[1]+"/"+dateauxI[0]
    const dateauxF = dateF.split("-");
    const dateFinal = dateauxF[2]+"/"+dateauxF[1]+"/"+dateauxF[0]

    let valorINumber = (valorI != '') ? parseInt(valorI) : -1
    let valorFNumber = (valorF != '') ? parseInt(valorF) : -1

    this.props.filtrar(nome, valorINumber, valorFNumber, dateInicial, dateFinal);

    e.preventDefault();
  }

  render() {
    const { contas, filtrando } = this.props;

    return (
      <div>
        <h1> Extrato Contas & Transações</h1>
        <br />
        <div className="content" id="content">
          <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit.bind(this)}>
              <table>
                <tbody>
                  <tr>
                    <div className="pure-control-group">
                      <td>
                        <label>Conta</label>
                        <select ref='nome'>
                          {
                            contas.map(
                              (conta) => {
                                return <option value= {conta.nome}>{conta.nome}</option>
                              }
                             )
                           }
                        </select>
                      </td>
                      <td><label>Valor Incial</label><input type="text" ref="valuestart" placeholder="Todos" /></td>
                      <td><label>Valor Final</label><input type="text" ref="valueend" placeholder="Todos" /></td>
                      <td><label>Data Inicial</label><input type="date" ref="datestart" /></td>
                      <td><label>Data Final</label><input type="date" ref="datefinal" placeholder="Data Final" /></td>
                    </div>
                  </tr>
                  <tr>
                      <td><input type="submit" className="pure-button pure-button-primary" value="Filtrar" onClick={this.handleSubmit.bind(this)} style={!filtrando ? {} : { display: 'none' }} /></td>
                  </tr>
                </tbody>
              </table>
            </form>
              <br />
              <br />
              <input type="button" className="pure-button pure-button-primary" style={filtrando ? {} : { display: 'none' }} value="Limpar filtros aplicados" onClick={this.handleLimparFiltros.bind(this)}/>
              {
                contas.map(
                  (conta) => {
                    return <div key={conta.id}>
                      <h2> Nome: {conta.nome} | Saldo: R$ {conta.saldo} </h2>
                      <br />
                      {
                        conta.transacoes.map(
                          (transacao) => {
                            return (
                              <div>
                                <br />
                                {transacao.nome}: R$ {transacao.valor.toString()} {transacao.tipo} em {transacao.data.toLocaleDateString()}
                                <br />
                              </div>
                            )
                          }
                        )
                      }
                      <br />
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