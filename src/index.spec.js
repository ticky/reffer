/* global describe, it, expect */
import reffer from './';

describe('Reffer', () => {
  describe('with Babel function bind syntax', () => {
    it('returns a function', () => {
      expect(() => ({}::reffer('meow'))).not.toThrow();
      expect({}::reffer('meow')).toBeInstanceOf(Function);
    });

    it('returns the same function as `.ref`', () => {
      const returnVal = {}::reffer('meow');
      expect(returnVal).toBeInstanceOf(Function);
      expect(returnVal.ref).toBeInstanceOf(Function);
      expect(returnVal).toBe(returnVal.ref);
    });

    describe('callback function', () => {
      it('applies the second supplied argument to the specified key on the object', () => {
        const myObject = {};
        const callback = myObject::reffer('nya');
        callback('purr');
        expect(myObject['nya']).toBe('purr');
      });
    });
  });

  describe('with ES5-compatible syntax', () => {
    it('returns a function', () => {
      expect(() => reffer({}, 'meow')).not.toThrow();
      expect(reffer({}, 'meow')).toBeInstanceOf(Function);
    });

    it('returns the same function as `.ref`', () => {
      const returnVal = reffer({}, 'meow');
      expect(returnVal).toBeInstanceOf(Function);
      expect(returnVal.ref).toBeInstanceOf(Function);
      expect(returnVal).toBe(returnVal.ref);
    });

    describe('callback function', () => {
      it('applies the second supplied argument to the specified key on the object', () => {
        const myObject = {};
        const callback = reffer(myObject, 'nya');
        callback('purr');
        expect(myObject['nya']).toBe('purr');
      });
    });
  });

  it('throws an error if given an invalid argument list', () => {
    expect(() => reffer({}, 'meow', 'purr')).toThrowErrorMatchingSnapshot();
    expect(() => reffer()).toThrowErrorMatchingSnapshot();
    expect(() => ({}::reffer())).toThrowErrorMatchingSnapshot();
  });
});
