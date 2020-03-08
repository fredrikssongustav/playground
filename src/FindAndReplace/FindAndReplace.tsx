import React, { useState, useEffect } from 'react';

const findAndReplaceMethod = (replaceThis: string, withThis: string, forThis: string): string => {
  const replaceRegex = new RegExp(replaceThis, 'g');
  return forThis.replace(replaceRegex, withThis);
};

export const FindAndReplace: React.FC = () => {
  const [replaceThis, setReplaceThis] = useState<string>('u');
  const [withThis, setWithThis] = useState<string>('q');
  const [forThis, setForThis] = useState<string>('gustav');
  const color = '#FFAE42';
  const bgColor = '#FFFF99';

  const updateForThis = (): void => {
    setForThis(findAndReplaceMethod(replaceThis, withThis, forThis));
  };

  const updateField = <T1 extends string, T2 extends HTMLInputElement | HTMLTextAreaElement> (
    e: React.ChangeEvent<T2>,
    setter: (value: T1) => void): void => {
    setter(`${e.target.value}` as T1);
  };

  useEffect(() => {
    const previewSpan = document.querySelector('#preview');
    if (previewSpan) {
      previewSpan.innerHTML = findAndReplaceMethod(replaceThis, `<span style="color:${color}; background:${bgColor}">${withThis}</span>`, forThis);
    }
  }, [replaceThis, withThis, forThis]);


  return (
    <div className="flex-container">
      <input
        data-testid="replace-this-input"
        placeholder="I want to replace this"
        value={replaceThis}
        onChange={(e): void => updateField<string, HTMLInputElement>(e, setReplaceThis)}
      />
      <input
        data-testid="with-this-input"
        placeholder="With this"
        value={withThis}
        onChange={(e): void => updateField<string, HTMLInputElement>(e, setWithThis)}
      />
      <textarea
        data-testid="for-this-input"
        placeholder="In this text field"
        value={forThis}
        onChange={(e): void => updateField<string, HTMLTextAreaElement>(e, setForThis)}
      />
      <button
        data-testid="make-replace-button"
        type="button"
        onClick={updateForThis}
      >
        Submit

      </button>
      {replaceThis
      && withThis
      && forThis
      && <span id="preview" data-testid="preview-span" />}
    </div>
  );
};
