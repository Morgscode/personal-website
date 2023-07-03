const gameLoaderModule = (function () {
  if (window.innerWidth >= 1200) {
    const target = document.querySelector('#phaser-game');
    if (target) {
      const phaser = document.createElement('script');
      const lebowski = document.createElement('script');
      phaser.src =
        'https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js';
      phaser.defer = true;
      phaser.async = true;
      phaser.type = 'module';
      phaser.id = 'phaser-script';
      lebowski.src = './dist/resources/little-lebowski/littleLebowskiApp.js';
      lebowski.defer = true;
      lebowski.async = true;
      lebowski.id = 'lebowski-script';
      window.addEventListener('load', () => {
        function loadScriptAsync(script, id) {
          return new Promise((resolve, reject) => {
            const appendedScript = target.appendChild(script);
            window.setTimeout(() => {
              if (appendedScript) {
                resolve(script);
              } else {
                reject(script);
              }
            }, 3000);
          });
        }
        const phaserLoaded = loadScriptAsync(phaser, '#phaser-script');
        phaserLoaded
          .then((result) => {
            if (result) {
              loadScriptAsync(lebowski, '#lebowski-script');
            }
          })
          .catch((error) => {
            phaserLoaded();
          });
      });
    }
  }
})();
