import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { bloomFilter } from './bloomFilter.js';

export default function SpellChecker () {
  const [ value, setValue ] = useState('');
  const [ isError, setIsError ] = useState(false);

  const handleChange = value => {
    setValue(value);
    setIsError(!bloomFilter.has(value));
  };

  return (
    <>
      <div className="spell-checker">
        <h1>Bloom Filter Spell Checker</h1>
        <label>
          <span className="spell-checker__label">Your spelling will be checked as you tipe 😉</span>
          <div className="spell-checker__input-wrapper">
            <input
              className={ `spell-checker__input ${ isError ? 'spell-checker__input--error' : '' }` }
              onChange={ e => handleChange(e.target.value) }
              placeholder="Type a word"
              aria-invalid={ isError }
              spellCheck={ false }
            />
            { isError && <i className="fas fa-exclamation-circle spell-checker__input-icon spell-checker__input-icon--error" aria-hidden="true" /> }
            { !isError && value && <i className="fas fa-check-circle spell-checker__input-icon spell-checker__input-icon--correct" aria-hidden="true" /> }
          </div>
          <p className="spell-checker__microcopy">Spelling is case-sensitive</p>
        </label>
      </div>
		</>
  );
}


ReactDOM.render(
	<SpellChecker />, document.getElementById('root')
);
