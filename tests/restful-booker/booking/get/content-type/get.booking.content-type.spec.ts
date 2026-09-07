import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import type { BookingListItem } from '../../../../../src/api/restful-booker/BookingApi';

test.describe('GET /booking - content-type', () => {
  test('should still return JSON list when Accept header is text/plain', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const response = await bookingApi.list({ Accept: 'text/plain' });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    const body = (await response.json()) as BookingListItem[];
    expect(Array.isArray(body)).toBeTruthy();
  });
});
