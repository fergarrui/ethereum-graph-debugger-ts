import React from 'react';
import { connect } from 'react-redux'
import CodeEditor from './AceEditor/main.js';

const mapStateToProps = state => {
  return {
      someState: state
 }
}

const ConnectedEditor = ({ code, index, someState }) => {
  
  return (
    <CodeEditor
      index={index}
      mode='javascript'
      theme='twilight'
      setReadOnly={true}
      style={{ height: '500px', width: '100%' }}
      setValue={code}
      setUseWorker={false}
      someProps={someState}
    >
    </CodeEditor>
  );
}

ConnectedEditor.displayName = 'Editor';

const Editor = connect(mapStateToProps)(ConnectedEditor)
export default Editor;
