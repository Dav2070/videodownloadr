import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { graphqlProvider } from './graphql.provider'
import { provideClientHydration } from '@angular/platform-browser'

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(),
		graphqlProvider,
		provideClientHydration()
	]
}
