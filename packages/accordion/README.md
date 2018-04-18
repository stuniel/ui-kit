# Talixo Accordion

UI component which represents Accordion

## How to install

Package is available as `@talixo/accordion` in NPM registry, so you can use it in your project
using `npm install @talixo/accordion --save` or `yarn add @talixo/accordion`.

## Requirements

Your package should additionally have some extra dependencies:

- `prop-types: ^15.6.1`
- `react: ^16.2.0`
- `react-dom: ^16.2.0`

These packages are required by `@talixo/accordion`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

Property name | Type      | Default | Description                    
--------------|-----------|:-------:|--------------------------------
className     | string    | n/a     | additional class name passed to wrapper
smooth        | bool      | n/a     | should elements be collapsed and opened smoothly?
animationTime | number    | n/a     | time of smooth animation (in ms)
options       | Option[]  | n/a     | options to show in Accordion
value         | any       | n/a     | ID of currently opened option
onChange      | func      | n/a     | Handler fired on possible change of opened container

## Types

### Option

Option which should be shown in Accordion has few required properties:

Property name | Type      | Default | Description
--------------|-----------|:-------:|--------------------------------
id            | *         | n/a     | Option ID
label         | node      | n/a     | Label to show in button
content       | nodes     | n/a     | Content to put inside collapsible element

## Changelog

- **1.0.0** - initial version