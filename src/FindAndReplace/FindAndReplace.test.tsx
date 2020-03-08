import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FindAndReplace } from './FindAndReplace';

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
      const { getByTestId } = render(<FindAndReplace />);

      await fireEvent.change(getByTestId('replace-this-input'), { target: { value: 'a' } });
      await fireEvent.change(getByTestId('with-this-input'), { target: { value: 'gustav' } });
      await fireEvent.change(getByTestId('for-this-input'), { target: { value: 'aba' } });
      await fireEvent.click(getByTestId('make-replace-button'));

      expect(getByTestId('for-this-input')).toHaveValue('gustavbgustav');
    });
  });
});
