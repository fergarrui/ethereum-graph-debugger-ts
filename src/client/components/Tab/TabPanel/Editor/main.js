import React from 'react';

import CodeEditor from './AceEditor/main.js';

const Editor = ({ code }) => {
  
  return (
    <CodeEditor
      mode='javascript'
      theme='twilight'
      setReadOnly={true}
      style={{ height: '400px', width: '100%' }}
      setValue={code}
      setUseWorker={false}
    >
    </CodeEditor>
  );
}

Editor.displayName = 'Editor';

export default Editor;