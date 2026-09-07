import { expect, test } from '../../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { getAuthCookie } from '../../../../../../src/helpers/restful-booker/AuthSessionHelper';
import type { CreateBookingResponse } from '../../../../../../src/api/restful-booker/BookingApi';

test.describe('PATCH /booking/{id} - validation', () => {
  test('should convert wrong totalprice type to null (current behavior)', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);

    const createResponse = await bookingApi.create(BookingPayloadBuilder.valid());
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

    const authCookie = await getAuthCookie(apiClient);

    const response = await bookingApi.patch(
      created.bookingid,
      { totalprice: 'wrong-type' },
      { Cookie: authCookie },
    );

    expect(response.status()).toBe(200);
    const body = (await response.json()) as { totalprice: number | null };
    expect(body.totalprice).toBeNull();
  });
});
