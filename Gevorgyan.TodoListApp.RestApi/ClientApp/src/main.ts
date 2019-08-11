import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { currentEnvironment } from './app/core/environment';

//if (currentEnvironment.isProduction) {
//	enableProdMode();
//}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.log(err));
