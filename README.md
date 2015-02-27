# Country Select

A wrapper that replaces a `<select>` element with a JavaScript powered drop down with mini-flags.

Check the demo in this repo.



## Usage

The `{countrycode}` variable is in the format specified in [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).

``` html
    <select name="country" class="flags">
		<option class="flag flag-{countrycode}">Country Name</option>
    </select>
```

## Setup

`git clone https://github.com/WillemLabu/country-select && cd country-select`

`npm i && bower install`

`grunt init`

:{D

To build a minified & optimised version of the code, run `grunt` and check the `dist` directory.


## Attribution

Using the FamFamFam pack from [flag-sprites](http://www.flag-sprites.com/).

You can generate a new flag-sprite and CSS from that site and just replace the proper files.

## Licence

MIT
