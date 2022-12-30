window.onload = function () {
  function resolveUrl (url) {
      const anchor = document.createElement('a')
      anchor.href = url
      return anchor.href
  }
  function resolveConfig (cb) {
    return fetch(
      resolveUrl('./uiConfig').replace('static/uiConfig', 'uiConfig')
    )
      .then(res => res.json())
      .then((config) => {
        const resConfig = Object.assign({}, {
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: "StandaloneLayout"
        }, config, {
          url: resolveUrl('./json').replace('static/json', 'json'),
          oauth2RedirectUrl: resolveUrl('./oauth2-redirect.html')
        });
        return cb(resConfig);
      })
    }
  // Begin Swagger UI call region
  const buildUi = function (config) {
    const ui = SwaggerUIBundle(config)
    window.ui = ui
    fetch(resolveUrl('./initOAuth').replace('static/initOAuth', 'initOAuth'))
      .then(res => res.json())
      .then((config) => {
        ui.initOAuth(config);
    });
    
  }
  // End Swagger UI call region
  resolveConfig(buildUi);
}