import React from 'react';

import Accordion from '../Accordion/main.js';
import AccordionSection from '../Accordion/AccordionSection/main.js';
import Operations from './Operations/main.js';
import Bytecode from './Bytecode/main.js';

import styles from '../../styles/Disassembler.scss';

const Disassembler = ({ constructorOperations, runtimeOperations, bytecode }) => {

    return (
      <div className={styles['disassemble-comp']}>
        <Accordion>
          <AccordionSection title='Bytecode'>
            <Bytecode bytecode={bytecode} />
          </AccordionSection>
          <AccordionSection title='Constructor Operations'>
            <Operations items={constructorOperations} />
          </AccordionSection>
          <AccordionSection title='Runtime Operations'>
            <Operations items={runtimeOperations} />
          </AccordionSection>
        </Accordion>
      </div>
    );
  
}

Disassembler.displayName = 'Disassembler';

export default Disassembler;
