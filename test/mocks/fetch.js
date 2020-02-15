export default function fetchMock(result) {
  return {
    json() { return Promise.resolve(result) }
  }
}
