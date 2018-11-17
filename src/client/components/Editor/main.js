import React from 'react';

import ReactAce from 'react-ace-editor';

const Editor = ({ code }) => {
  return (
    <ReactAce
      mode="javascript"
      theme='monokai'
      setReadOnly={true}
      style={{ height: '400px' }}
      setValue={code}
    >
    </ReactAce>
  );
}

Editor.displayName = 'Editor';

export default Editor;