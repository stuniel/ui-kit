# Talixo FormField

UI Component which represents FormField

## How to install

Package is available as `@talixo/form-field` in NPM registry, so you can use it in your project
using `npm install @talixo/form-field --save` or `yarn add @talixo/form-field`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/checkbox: ^1.0.0-alpha.5`
- `@talixo/number-input: ^1.0.0-alpha.5`
- `@talixo/shared: ^1.0.0-alpha.5`
- `@talixo/text-input: ^1.0.0-alpha.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/form-field`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | Additional class name passed to wrapper.
error         | node      | n/a     | Displayed error message.
hint          | node      | n/a     | Displayed hint message.
id            | string    | n/a     | Id for input.
label         | node      | n/a     | Label for input.
onBlur        | function  | n/a     | Event called after input has lost focus.
onChange      | function  | n/a     | Event called after input has been changed.
onFocus       | function  | n/a     | Event called after input has gained focus.
warning       | node      | n/a     | Displayed warning message.
value         | any       | n/a     | Value passed to input.

## Changelog

- **0.1.0** - initial version