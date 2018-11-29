import React from 'react';

import CodeEditor from './AceEditor/main.js';

const Editor = ({ code, index }) => {
  
  return (
    <CodeEditor
      index={index}
      mode='javascript'
      theme='twilight'
      setReadOnly={true}
      style={{ height: '500px', width: '100%' }}
      setValue={code}
      setUseWorker={false}
    >
    </CodeEditor>
  );
}

Editor.displayName = 'Editor';

export default Editor;
