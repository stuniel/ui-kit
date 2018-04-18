# Talixo map

UI Component which represents map

## How to install

Package is available as `@talixo/map` in NPM registry, so you can use it in your project
using `npm install @talixo/map --save` or `yarn add @talixo/map`.

## Requirements

Your package should additionally have some extra dependencies:

- `classnames: ^2.2.5`
- `prop-types: ^15.6.1`
- `react: ^16.2.0`

These packages are required by `@talixo/map`, but you have to install them manually,
to avoid having different versions of these in your application.

## Supported props

### Maps

Property name | Type      | Required | Default | Description
--------------|-----------|----------|:-------:|----------------------------------------
className     | string    | no       | n/a     | additional class name passed to wrapper
apiKey        | string    | yes      | n/a     | your Api Key from GoogleMaps
zoom          | number    | no       | `6`     | zoom
center        | object    | no       | n/a     | centered position
interactive   | boolean   | no       | `true`  | enable to move and zoom map

### Directions

Property name | Type            | Required | Default | Description
--------------|-----------------|----------|:-------:|------------------------------------------------
startPoint    | object          | yes      | n/a     | start point of directions
endPoint      | object          | yes      | n/a     | end point of directions
via           | object|object[] | yes      | n/a     | either single waypoint or list of waypoints

### Marker

Property name | Type      | Required | Default       | Description
--------------|-----------|----------|:-------------:|------------------------------------------------
position      | object    | yes      | n/a           | start point of directions
info          | nodes     | no       | n/a           | info window content
open          | boolean   | no       | is controlled | should the info window be opened?
onClick       | function  | no       | n/a           | handler on click on marker
onClose       | function  | no       | n/a           | handler on click on close button in info window

## Changelog

- **1.0.0** - initial version