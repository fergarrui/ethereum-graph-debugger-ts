import React, { Component } from 'react';
import PropTypes from 'prop-types';
import brace from 'brace';
// var Range = require('ace/range').Range

if (typeof window !== 'undefined') {
  const ace = require('brace');
}

class CodeEditor extends Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      const {
        onChange,
        setReadOnly,
        setValue,
        theme,
        mode,
        setUseWorker,
        index,
      } = this.props;

      require(`brace/mode/${mode}`);
      require(`brace/theme/${theme}`);
      const editor = ace.edit(`ace-editor-${index}`);
      this.editor = editor;
      editor.getSession().setMode(`ace/mode/${mode}`);
      editor.getSession().setUseWorker(setUseWorker);
      editor.setTheme(`ace/theme/${theme}`);
      editor.on('change', e => onChange(editor.getValue(), e));
      editor.setReadOnly(setReadOnly);
      editor.setValue(setValue);
      this.selectLines(0,0)
    }
  }

  selectLines(begin, end) {
    const {
      index
    } = this.props;
    const editor = ace.edit(`ace-editor-${index}`);
    const lines = editor.session.doc.getAllLines();
    console.log(lines)
    let s = begin;
    let e = end;
    let startRow = 0;
    let startCol = 0;
    let endRow = 0;
    let endCol = 0;
    let startFound = false;
    let endFound = false;
    if (begin >= end) {
        const temp = begin;
        begin = end;
        end = temp;
    }
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (s > line.length && !startFound) {
            startRow++;
            // +1 because of new line
            s -= line.length + 1;
        } else {
            startCol = s;
            startFound = true;
        }
        if (e > line.length && !endFound) {
            endRow++;
            // + 1 because of new line
            e -= line.length + 1;
        } else {
            endCol = e;
            endFound = true;
        }
        if (startFound && endFound) {
            break;
        }
    }
    const Range = ace.acequire('ace/range').Range;
    const range = new Range(startRow, startCol, endRow, endCol);
    editor.gotoLine(startRow, 0, true);
    editor.session.selection.setSelectionRange(range, false);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { style, index } = this.props;

    return (
      <div id={`ace-editor-${index}`} style={style}></div>
    );
  }
}

CodeEditor.propTypes = {
  editorId: PropTypes.string,
  onChange: PropTypes.func,
  setReadOnly: PropTypes.bool,
  setValue: PropTypes.string,
  theme: PropTypes.string,
  mode: PropTypes.string,
  style: PropTypes.object,
};

CodeEditor.defaultProps = {
  onChange: () => {},
  setValue: '',
  setReadOnly: false,
  theme: 'eclipse',
  mode: 'javascript',
  style: { height: '300px', width: '400px'}
};


export default CodeEditor;
