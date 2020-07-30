import React, {Component} from 'react';
import Page from '../../Page';
import InfiniteScroll from 'react-infinite-scroller';
import './alumnos.css';

import {obtenerAlumnosFacet} from './actions';
import { NavLink } from 'react-router-dom';
import { IoIosInformationCircle } from 'react-icons/io'
export default class extends Component{
  constructor(){
    super();
    this.state = {
      alumnos : [],
      hasMore : true,
      page:1,
      itemToLoad: 15,
      loading: true,
    }
    this.loadMore = this.loadMore.bind(this);
  }
  async loadMore(pageToLoad){
    try{
      let result = await obtenerAlumnosFacet(pageToLoad,this.state.itemToLoad);
      console.log(result);
      if(result.total > 0){
        let newAlumnos = this.state.alumnos.concat(result.alumnos);
        this.setState(
          {
            ...this.state,
            alumnos:newAlumnos,
            hasMore: (pageToLoad * this.state.itemToLoad < result.total)
          }
        )
      } else {
        this.setState(
          {hasMore:false}
        )
      }

    }catch(e){
      this.setState(
        { hasMore: false }
      )
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
      <section className="listholder" ref={(ref)=>this.scrollParentRef = ref}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            useWindow={false}
            getScrollParent={()=>this.scrollParentRef}
            loader={<div key={"Item0NotFound"} className="listItem">Loading ..</div>}
          >
            {alumnosListItem}
          </InfiniteScroll>
          
      </section>
      </Page>
    );
  }

}
