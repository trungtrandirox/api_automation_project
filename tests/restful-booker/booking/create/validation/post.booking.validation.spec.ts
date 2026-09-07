import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import type { CreateBookingResponse } from '../../../../../src/api/restful-booker/BookingApi';

test.describe('POST /booking - validation', () => {
  test('should show current behavior when totalprice has wrong type', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const payload = {
      ...BookingPayloadBuilder.valid(),
      totalprice: 'abc',
    };

    const response = await bookingApi.create(payload);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as CreateBookingResponse;
    expect(body.booking.totalprice).toBeNull();
  });

  test('should accept empty firstname (current behavior)', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const payload = {
      ...BookingPayloadBuilder.valid(),
      firstname: '',
    };

    const response = await bookingApi.create(payload);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as CreateBookingResponse;
    expect(body.booking.firstname).toBe('');
  });
});
