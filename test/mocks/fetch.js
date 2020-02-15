/* eslint-env jest */

export default function createFetch (jsonResult) {
  return jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(jsonResult)
  })
}
