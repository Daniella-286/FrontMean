import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformDynamicServer } from '@angular/platform-server';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

if (environment.production) {
  enableProdMode();
}

platformDynamicServer().bootstrapModule(AppModule)
  .catch(err => console.error(err));

export default bootstrap;
