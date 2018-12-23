import React, { Component } from 'react';
import PropTypes from 'prop-types';
import brace from 'brace';

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
    }
  }


  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { style, index, someEditorProps } = this.props;

    return (
      <div id={`ace-editor-${index}`} style={style} edProps={someEditorProps}></div>
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
