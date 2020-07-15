import React, {Component} from 'react';
import Page from '../../Page';
import VotingDeck from './VotingDeck';
export default class extends Component {
  constructor(){
    super();
    this.state = {
      countSi:0,
      countNo:0,
      countAbstener:0
    }
    this.addToCounter = this.addToCounter.bind(this);
  }
  addToCounter(vote){
    const keyStr = 'count' + vote;
    const value = this.state[keyStr]+ 1;
    this.setState(
      {...this.state, [keyStr]:value}
    )
  }
  render(){
    return (
      <Page
        title="Mociones por Votar"
        showHeader={true}
        showFooter={false}
      >
        <VotingDeck rsmHandler={this.addToCounter} title="Ingreso por Medio de RFID"></VotingDeck>
        <VotingDeck rsmHandler={this.addToCounter} title="Modernización de Parque"></VotingDeck>
        <VotingDeck rsmHandler={this.addToCounter}  title="Ampliación de Opciones de Pagos para Cuota"></VotingDeck>
        <section>
         <p>Si: {this.state.countSi}</p>
         <p>No: {this.state.countNo}</p>
         <p>Abstener: {this.state.countAbstener}</p>
        </section>
      </Page>
    );
  }
}
