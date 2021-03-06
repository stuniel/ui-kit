# Talixo Calendar

UI Component which represents Calendar

## How to install

Package is available as `@talixo/calendar` in NPM registry, so you can use it in your project
using `npm install @talixo/calendar --save` or `yarn add @talixo/calendar`.

## Requirements

Your package should additionally have some extra dependencies:

- `@talixo/icon: ^1.0.0-alpha.35`
- `@talixo/shared: ^1.0.0-alpha.35`
- `moment: ^2.22.1`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dates: ^18.3.0`

These packages are required by `@talixo/calendar`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

It allows any props which are allowed for `SingleDatePicker`. Additionally, it handles some differently:

Property name      | Type                          | Default         | Description
-------------------|-------------------------------|:---------------:|--------------------------------
className          | string                        | n/a             | additional class name passed to wrapper
displayFormat      | string                        | `'D MMM YYYY'`  | date display format
dayAriaLabelFormat | string                        | n/a             | day aria label format
monthFormat        | string                        | n/a             | month format
phrases            | object                        | n/a             | phrases for i18n
weekDayFormat      | string                        | n/a             | week day format
placeholder        | string                        | n/a             | placeholder text
value              | string in `YYYY-MM-DD` format | self-controlled | current date
onChange           | function                      | n/a             | event handler when date is changed
onFocus            | function                      | n/a             | event handler when calendar is focused
onBlur             | function                      | n/a             | event handler when calendar lost focus
id                 | string                        | n/a             | ID passed to control element
error              | bool                          | `false`         | show error styles of calendar
disabled           | bool                          | `false`         | Should it be disabled?
readOnly           | bool                          | `false`         | Should it be read-only?

## Changelog

- **0.1.1** - reduce bundle size
- **0.1.0** - initial version
