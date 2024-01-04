import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { Apollo, gql } from 'apollo-angular'
import * as DavUIComponents from 'dav-ui-components'

export const youtubeUrlRegex = /^(https?:\/\/)?(www.)?youtube.com\/.+$/
export const shareYoutubeUrlRegex = /^https:\/\/youtu.be\/.+/

@Component({
	selector: 'app-root',
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	url: string = ''
	loading: boolean = false
	urlValid: boolean = false

	constructor(private apollo: Apollo) {
		DavUIComponents.setLocale('en-US')
	}

	urlChange(event: Event) {
		this.url = (event as CustomEvent).detail.value
		this.urlValid =
			youtubeUrlRegex.test(this.url) || shareYoutubeUrlRegex.test(this.url)
	}

	async downloadButtonClick() {
		this.loading = true

		let result = await this.apollo
			.query<{ downloadYoutubeVideo: { url: string } }>({
				query: gql`
					query DownloadYoutubeVideo($url: String!) {
						downloadYoutubeVideo(url: $url) {
							url
						}
					}
				`,
				variables: {
					url: this.url
				}
			})
			.toPromise()

		this.loading = false

		if (result?.data != null) {
			let a = document.createElement('a')
			a.href = result.data.downloadYoutubeVideo.url
			a.click()
		}
	}
}
