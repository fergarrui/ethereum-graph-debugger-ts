import React,  { Component } from 'react';

import styles from '../../styles/Graph.scss';

import * as d3 from 'd3';
import * as d3Graphviz from 'd3-graphviz';

import { connect } from 'react-redux';
import {selectEditorLines} from '../Store/Actions.js';

const mapDispatchToProps = (dispatch) => {
  return {
    selectLines: lines => dispatch(selectEditorLines(lines))
  }
}

class ConnectedGraph extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { cfg, graphId } = this.props;

    const graphclass = graphId.replace('.sol', '');
    const graphviz = d3.select(`.graph--${graphclass}`).graphviz()
    graphviz.renderDot(cfg);
    // TODO make it configurable?
    graphviz.totalMemory(537395200)
    graphviz._zoomBehavior.scaleExtent([1/10, 10000]);
    d3.selectAll("a").attr("href", null).attr("title", null);
  }

  handleClick(event) {
    const { operations, selectLines } = this.props;
    if (event.target.tagName === 'text') {
      const elem = d3.select(event.target.parentElement.parentElement);
      const id = elem.attr('id').replace('a_', '') ;
      const idNum = parseInt(id, 16);
      const selectedOperation = operations.find(op => op.offset === idNum);
      if (selectedOperation && selectedOperation.begin && selectedOperation.end) {
        selectLines([selectedOperation.begin, selectedOperation.end]);
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

const Graph = connect(null, mapDispatchToProps)(ConnectedGraph);

export default Graph;
