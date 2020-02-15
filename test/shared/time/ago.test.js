import { ago } from "../../../src/shared/time/ago"

test('it outputs a few seconds ago', () => {
  expect(ago(5)).toBe('a few seconds ago')
})

test('it outputs over 1 minute ago', () => {
  expect(ago(1.5 * 60)).toBe('over 1 minute ago')
})

test('it outputs over minutes ago', () => {
  expect(ago(10 * 60)).toBe('over 10 minutes ago')
})

test('it outputs over hours ago', () => {
  expect(ago(15 * 60 * 60)).toBe('over 15 hours ago')
})

test('it outputs over days ago', () => {
  expect(ago(4 * 60 * 60 * 24)).toBe('over 4 days ago')
})

test('it outputs over weeks ago', () => {
  expect(ago(3 * 60 * 60 * 24 * 7)).toBe('over 3 weeks ago')
})

test('it outputs over months ago', () => {
  expect(ago(5 * 60 * 60 * 24 * 30)).toBe('over 5 months ago')
})

test('it outputs over years ago', () => {
  expect(ago(10.5 * 60 * 60 * 24 * 365)).toBe('over 10 years ago')
})