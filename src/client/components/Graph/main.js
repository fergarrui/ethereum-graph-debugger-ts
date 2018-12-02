import React,  { Component } from 'react';

import styles from '../../styles/Graph.scss';

import * as d3 from 'd3';
import * as d3Graphviz from 'd3-graphviz';

class Graph extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { cfg, graphId } = this.props;

    const graphclass = graphId.replace('.sol', '');

    d3.select(`.graph--${graphclass}`).graphviz().renderDot(cfg);
  }

  handleClick(event) {
    console.log(event.target);
    console.dir(event.target);
  }

  render() {
    const { cfg, graphId } = this.props;

    const graphclass = graphId.replace('.sol', '');

    return (
      <div className={styles['graph-container']}>
        <div onClick={(e) => this.handleClick(e)} className={`graph--${graphclass}`}  cfg={cfg}></div>
      </div>
    );
  }
}

export default Graph;