import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { expectNotFound } from '../../../../../src/assertions/HttpAssertions';
import { getAuthCookie } from '../../../../../src/helpers/restful-booker/AuthSessionHelper';
import type { CreateBookingResponse } from '../../../../../src/api/restful-booker/BookingApi';

test.describe('DELETE /booking/{id} - positive', () => {
  test('should delete booking with valid auth token', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);

    const createResponse = await bookingApi.create(BookingPayloadBuilder.valid());
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

    const authCookie = await getAuthCookie(apiClient);

    const deleteResponse = await bookingApi.delete(created.bookingid, {
      Cookie: authCookie,
    });
    expect(deleteResponse.status()).toBe(201);
    await expect(deleteResponse.text()).resolves.toBe('Created');

    const getAfterDelete = await bookingApi.getById(created.bookingid);
    await expectNotFound(getAfterDelete);
  });
});
