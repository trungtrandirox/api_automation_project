import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { expectMethodNotAllowed } from '../../../../../src/assertions/HttpAssertions';
import { getAuthCookie } from '../../../../../src/helpers/restful-booker/AuthSessionHelper';
import type { CreateBookingResponse } from '../../../../../src/api/restful-booker/BookingApi';

test.describe('DELETE /booking/{id} - validation', () => {
  test('should return 405 when deleting the same booking twice', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);

    const createResponse = await bookingApi.create(BookingPayloadBuilder.valid());
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

    const authCookie = await getAuthCookie(apiClient);
    const authHeader = { Cookie: authCookie };

    const firstDelete = await bookingApi.delete(created.bookingid, authHeader);
    expect(firstDelete.status()).toBe(201);

    const secondDelete = await bookingApi.delete(created.bookingid, authHeader);
    await expectMethodNotAllowed(secondDelete);
  });

  test('should return 405 when deleting non-existing booking id', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const authCookie = await getAuthCookie(apiClient);
    const response = await bookingApi.delete(999999999, { Cookie: authCookie });
    await expectMethodNotAllowed(response);
  });
});
