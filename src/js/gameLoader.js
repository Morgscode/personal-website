"use strict";

const phaserLoaderModule = (function () {
    if (window.innerWidth >= 1200) {
        const target = document.querySelector('#phaser-game');
        if (target) {
            window.addEventListener('load', () => {
                const phaser = document.createElement('script');
                phaser.src = 'https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.min.js';
                phaser.defer = true;
                phaser.id = 'phaser-script';
                const lebowski = document.createElement('script');
                lebowski.src = './dist/resources/little-lebowski/littleLebowskiApp.js';
                lebowski.defer = true;
                lebowski.id = 'lebowski-script';
                function loadScriptAsync(script, id) {
                    return new Promise((resolve, reject) => {
                        target.appendChild(script);
                        window.setTimeout(() => {
                            const phaser = document.querySelector(id);
                            if (script) {
                                resolve(script);
                            } else {
                                reject(false);
                                loadScriptAsync(script, id);
                            }
                        }, 300);
                    });
                }
                const phaserLoaded = loadScriptAsync(phaser, '#phaser-script');
                phaserLoaded.then((result) => {
                    if (result) {
                        loadScriptAsync(lebowski, '#lebowski-script');
                    }
                });
            });
        }
    }
})();