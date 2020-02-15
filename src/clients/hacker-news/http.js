export default class HackerNewsHttpClient {
  constructor(fetch, apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl
    this.fetch = fetch;
  }

  async getNewStories() {
    const result = await this.fetch(`${this.apiBaseUrl}/v0/newstories.json`)
    return result.json()
  }

  async getItem(itemId) {
    const result = await this.fetch(`${this.apiBaseUrl}/v0/item/${itemId}.json`)
    return result.json()
  }
}
