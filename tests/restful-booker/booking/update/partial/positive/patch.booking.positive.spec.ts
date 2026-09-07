import { expect, test } from '../../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { getAuthCookie } from '../../../../../../src/helpers/restful-booker/AuthSessionHelper';
import type {
  CreateBookingResponse,
  PatchBookingPayload,
  UpdateBookingPayload,
} from '../../../../../../src/api/restful-booker/BookingApi';

test.describe('PATCH /booking/{id} - positive', () => {
  test('should patch selected fields with valid auth token', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);

    const createResponse = await bookingApi.create(BookingPayloadBuilder.valid());
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

    const authCookie = await getAuthCookie(apiClient);

    const patchPayload: PatchBookingPayload = {
      firstname: 'PatchedName',
      additionalneeds: 'Dinner',
    };
    const patchResponse = await bookingApi.patch(created.bookingid, patchPayload, {
      Cookie: authCookie,
    });

    expect(patchResponse.status()).toBe(200);
    const patchedBody = (await patchResponse.json()) as UpdateBookingPayload;
    expect(patchedBody.firstname).toBe('PatchedName');
    expect(patchedBody.additionalneeds).toBe('Dinner');
    expect(patchedBody.lastname).toBe(created.booking.lastname);
    expect(created.booking.totalprice).not.toBeNull();
    expect(patchedBody.totalprice).toBe(created.booking.totalprice);
    expect(patchedBody.depositpaid).toBe(created.booking.depositpaid);
    expect(patchedBody.bookingdates).toEqual(created.booking.bookingdates);
  });
});
