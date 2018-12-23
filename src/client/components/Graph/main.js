import React,  { Component } from 'react';

import styles from '../../styles/Graph.scss';

import * as d3 from 'd3';
import * as d3Graphviz from 'd3-graphviz';

// import { connect } from 'react-redux';
// import { getFunction } from '../Store/Actions.js';

// const mapDispatchToProps = (dispatch) => {
//   getText: text => dispatch(getFunction(text))
// }

class Graph extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { cfg, graphId } = this.props;

    const graphclass = graphId.replace('.sol', '');

    d3.select(`.graph--${graphclass}`).graphviz().renderDot(cfg);
    d3.selectAll("a").attr("href", null).attr("title", null);
  }

  handleClick(event) {
    const { operations } = this.props;
    if (event.target.tagName === 'text') {
      const elem = d3.select(event.target.parentElement.parentElement);
      const id = elem.attr('id').replace('a_', '') ;
      const idNum = parseInt(id, 16);
      const selectedOperation = operations.find(op => op.offset === idNum);
      if (selectedOperation && selectedOperation.begin && selectedOperation.end) {
        console.log(selectedOperation.begin);
        console.log(selectedOperation.end);
      }
    }
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

// const Graph = connect(null, mapDispatchToProps)(ExportedGraph);

export default Graph;