import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../src/builders/restful-booker/BookingPayloadBuilder';

test.describe('POST /booking - positive', () => {
  test('should create booking with valid payload', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const payload = BookingPayloadBuilder.valid();
    const response = await bookingApi.create(payload);

    expect(response.status()).toBe(200);
    const body = (await response.json()) as { bookingid: number; booking: unknown };
    expect(typeof body.bookingid).toBe('number');
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking).toEqual(payload);
  });
});
