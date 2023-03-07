export const normalizePath = (path: string)  => 
    path
      .replace(/\/\.\//g, '/') 
      .replace(/\/{2,}/g, '/') 
      .replace(/^\/\.$/, '/')
      .replace(/^\.\/$/, '.') 
      .replace(/^\.\//, '')
      .replace(/\/\.$/, '')
      .replace(/(.+)\/$/, '$1')
      .replace(/^$/, '.')