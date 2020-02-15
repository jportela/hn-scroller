export default class Story {
  constructor ({ id, title, url, author, timestamp }) {
    this.id = id
    this.title = title
    this.url = url
    this.author = author
    this.timestamp = timestamp
  }

  static fromItem (item) {
    return new Story({
      id: item.id,
      title: item.title,
      url: item.url,
      author: item.by,
      timestamp: item.time
    })
  }

  static fromNull (itemId) {
    return new Story({
      id: itemId
    })
  }
}
