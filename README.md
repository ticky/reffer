# Reffer

[![Greenkeeper badge](https://badges.greenkeeper.io/ticky/reffer.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/reffer.svg?maxAge=2592000)](https://www.npmjs.com/package/reffer) ![reffer](https://img.shields.io/npm/l/reffer.svg?maxAge=2592000)  [![Build Status](https://travis-ci.org/ticky/reffer.svg?branch=develop)](https://travis-ci.org/ticky/reffer) [![codecov](https://codecov.io/gh/ticky/reffer/branch/develop/graph/badge.svg)](https://codecov.io/gh/ticky/reffer)

Nice, DRY replacement for React string refs

## Introduction

React no longer allows string-based refs. Reffer is a small function to substitute in for those times that you don't need anything fancy from your ref callbacks. It avoids encouraging you to make one-character variables by managing the callback action itself.

To borrow and adapt [React's own ref example](https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute), with Babel's experimental `transform-function-bind` plugin enabled, this is the ideal usage;

```jsx
import reffer from 'reffer';

class CustomTextInput extends React.Component {
  handleFocusClick = () => {
    // Explicitly focus the text input using the raw DOM API
    this.textInput.focus();
  };

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in this.textInput.
    return (
      <div>
        <input
          type="text"
          ref={this::reffer('textInput')} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.handleFocusClick}
        />
      </div>
    );
  }
}
```

Reffer will return a simple function, which will apply the supplied ref to `this` when it's called.

### Alternative Use

There are a few different modes of operation for Reffer, the first is passing its return value as the `ref` attribute (as seen above).

#### Spread Syntax

The second is to spread its return value onto the React component in question;

```jsx
<input
  type="text"
  {...this::reffer('textInput')} />
```

This will set `ref` on the element just the same as before, but is presented as an alternative syntax.

#### Plain JSX transformer compatible method

Alternatively, if you either aren't using Babel, or want to avoid experimental syntax, you can use Reffer like this;

```jsx
<input
  type="text"
  ref={reffer(this, 'textInput')} />
```

or, the same way, but using Spread syntax;

```jsx
<input
  type="text"
  {...reffer(this, 'textInput')} />
```
