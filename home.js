
        // Create manifest dynamically (so all code stays in one file)
        const manifestData = {
            "name": "विष्णुपुर छठ पूजा ऐप",
            "short_name": "Chhath Puja",
            "start_url": "home.html",
            "display": "standalone",
            "background_color": "#ffffff",
            "theme_color": "#0d47a1",
            "icons": [
                {
                    "src": "https://w7.pngwing.com/pngs/380/709/png-transparent-happy-chhath-puja-basket-for-chhath-puja.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "https://w7.pngwing.com/pngs/380/709/png-transparent-happy-chhath-puja-basket-for-chhath-puja.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ]
        };

        const stringManifest = JSON.stringify(manifestData);
        const blob = new Blob([stringManifest], { type: 'application/json' });
        const manifestURL = URL.createObjectURL(blob);
        document.querySelector('link[rel="manifest"]').setAttribute('href', manifestURL);

        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js', { scope: './' })
                .then(() => console.log('Service Worker Registered'))
                .catch(err => console.log('Service Worker registration failed:', err));
        }

        // Add to Home Screen logic
        let deferredPrompt;
        const installBtn = document.getElementById('installBtn');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'inline-block';
        });

        installBtn.addEventListener('click', async () => {
            installBtn.style.display = 'none';
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response: ${outcome}`);
                deferredPrompt = null;
            }
        });

        // Create simple Service Worker inline (if not exists)
        if ('serviceWorker' in navigator) {
            const swCode = `
        self.addEventListener('install', (event) => {
          console.log('Service Worker installing.');
          self.skipWaiting();
        });
        self.addEventListener('activate', (event) => {
          console.log('Service Worker activating.');
        });
        self.addEventListener('fetch', (event) => {
          event.respondWith(fetch(event.request));
        });
      `;
            const blob = new Blob([swCode], { type: 'application/javascript' });
            const swURL = URL.createObjectURL(blob);
            navigator.serviceWorker.register(swURL);
        }
