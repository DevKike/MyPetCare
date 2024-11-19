import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err))
  .finally(() => {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.style.display = 'none';
  });
