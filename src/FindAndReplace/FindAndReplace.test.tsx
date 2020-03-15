import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FindAndReplace, FindAndReplaceProps, findAndReplaceMethod } from './FindAndReplace';

const findAndReplaceProps: FindAndReplaceProps = {
  replaceThisInit: 'a',
  withThisInit: 'gustav',
  forThisInit: 'aba',
};

describe('FindAndReplace component', () => {
  describe('it should have the necessary components', () => {
    it('has on mount a changeable text field where we can declare what to replace', async () => {
      const { getByTestId } = render(<FindAndReplace />);

      await fireEvent.change(getByTestId('replace-this-input'), { target: { value: 'abc' } });

      expect(getByTestId('replace-this-input')).toHaveValue('abc');
    });

    it('has on mount a changeable text field where we can declare what to replace with', async () => {
      const { getByTestId } = render(<FindAndReplace />);

      await fireEvent.change(getByTestId('with-this-input'), { target: { value: 'abc' } });

      expect(getByTestId('with-this-input')).toHaveValue('abc');
    });

    it('has on mount a changeable text field where we can declare what text we want to replace for', async () => {
      const { getByTestId } = render(<FindAndReplace />);

      await fireEvent.change(getByTestId('for-this-input'), { target: { value: 'abc' } });

      expect(getByTestId('for-this-input')).toHaveValue('abc');
    });

    it('has on mount a button that execute the change on the original text', async () => {
      const { getByTestId } = render(<FindAndReplace {...findAndReplaceProps} />);

      await fireEvent.click(getByTestId('make-replace-button'));

      expect(getByTestId('for-this-input')).toHaveValue('gustavbgustav');
    });

    it('show changes preview', async () => {
      const { getByTestId } = render(<FindAndReplace {...findAndReplaceProps} />);

      expect(getByTestId('preview-span').innerHTML).toBe('<span style=\"color:#FFAE42; background:#FFFF99\">gustav</span>b<span style=\"color:#FFAE42; background:#FFFF99\">gustav</span>');
    });
  });

  describe('should replace things accurately', () => {
    it('for standard case finds and replace string values', () => {
      expect(findAndReplaceMethod('a', 'b', 'abc')).toBe('bbc');
    });

    it('handles edge cases newline', () => {
      expect(findAndReplaceMethod('a', '\n', 'abc')).toBe('<br/>bc');
    });
  });
});
