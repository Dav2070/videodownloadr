import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { Apollo, gql } from 'apollo-angular'
import * as DavUIComponents from 'dav-ui-components'

@Component({
	selector: 'app-root',
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	constructor(private apollo: Apollo) {
		DavUIComponents.setLocale('en-US')
	}

	async ngOnInit() {
		let result = await this.apollo
			.query({
				query: gql`
					query DownloadYoutubeVideo($url: String!) {
						downloadYoutubeVideo(url: $url) {
							url
						}
					}
				`,
				variables: {
					url: 'https://www.youtube.com/watch?v=s9mrozk-bGQ&list=PLLv3qeuV3YDpR4x4iEJZmcZWyDKGXB0Yl&index=9&ab_channel=ThrillerSoundtrackMusic'
				}
			})
			.toPromise()

		console.log(result)
	}
}
