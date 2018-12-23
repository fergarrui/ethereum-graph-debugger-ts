import React from 'react';

import CodeEditor from './AceEditor/main.js';

const Editor = ({ code, index, someProp }) => {
  
  return (
    <CodeEditor
      index={index}
      mode='javascript'
      theme='twilight'
      setReadOnly={true}
      style={{ height: '500px', width: '100%' }}
      setValue={code}
      setUseWorker={false}
      someEditorProp={someProp ? console.log('yes ther are') : console.log('no there aren')}
    >
    </CodeEditor>
  );
}

Editor.displayName = 'Editor';

export default Editor;
