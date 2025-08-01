import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptor/header/header.interceptor';
import { loadingInterceptor } from './core/interceptor/loading/loading.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,
    withViewTransitions(),
    withInMemoryScrolling({scrollPositionRestoration:"top"}), 
    withHashLocation()),
    provideClientHydration(withEventReplay()), 
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, loadingInterceptor]) ) ,
    provideAnimations(),
    provideToastr(),
    importProvidersFrom( NgxSpinnerModule )
  ]
};
