# settings (based on DigitalOcean Strapi droplet)

## images resizeparameters 

go to development strapi project folder

``` bash
cd /srv/strapi/strapi-development
```

create or open file settings parameter for plugins:

```
nano config/plugins.js
```

and add this settings:

``` js
module.exports = {
  upload: {
    breakpoints: {
      xlarge: 1920,
      large: 1000,
      medium: 750,
      small: 500,
      xsmall: 64
    }
  }
}
```


# website

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
