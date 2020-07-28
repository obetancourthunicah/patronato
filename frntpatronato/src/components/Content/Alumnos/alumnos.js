import React, {Component} from 'react';
import Page from '../../Page';

import './alumnos.css';

import {obtenerAlumnos} from './actions';
import { NavLink } from 'react-router-dom';
import { IoIosInformationCircle } from 'react-icons/io'
export default class extends Component{
  constructor(){
    super();
    this.state = {
      alumnos : [],
      loading: true,
    }
  }
  async componentDidMount(){
    try {
      let alumnos = await obtenerAlumnos();
       this.setState({...this.state, alumnos: alumnos});
    }catch(e){
      console.log(e);
    }
  }
  render(){
    const alumnosListItem = this.state.alumnos.map((o)=>{
      let productos = o.productos;
      return (<div key={o._id} className="listItem">
        <b>{o.cuenta}</b><b>{o.nombre.trim()}</b><NavLink to={`/alumno/${o._id}`}><IoIosInformationCircle/></NavLink>
      </div>);
    });
    return (
      <Page
        showHeader={true}
        showFooter={true}
        title={"Alumnos"}
        auth={this.props.auth}
      >
      <section className="listholder">
          {alumnosListItem}
      </section>
      </Page>
    );
  }

}
