import React, { Component } from 'react';
import Page from '../../Page';
import './alumnos.css';

import { obtenerAlumnoById } from './actions';
import { NavLink } from 'react-router-dom';
export default class extends Component {
  constructor() {
    super();
    this.state = {
      alumno:{},
      loading: true,
    }
  }
  async componentDidMount(){
    const id = this.props.match.params.id;
    let alumno = await obtenerAlumnoById(id);
    this.setState({
      ...this.state,
      alumno:alumno
    });
  }
  render() {
    const nombre = this.state.alumno.nombre || 'Not Found';
    const {nombre:nmb,  cuenta, like, dislike} = this.state.alumno;
    return (
      <Page
        showHeader={true}
        showFooter={false}
        title={nombre.substring(0,15) + '...'}
        auth={this.props.auth}
      >
        <div>Nombre: {nmb}</div>
        <div>Cuenta: {cuenta}</div>
        <div>Likes: {like}</div>
        <div>Dislikes: {dislike}</div>
        <NavLink to={`/alumnos#${this.state.alumno._id}`}>Regresar</NavLink>
      </Page>
    );
  }

}
