import { expect, test } from '../../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { getAuthCookie } from '../../../../../../src/helpers/restful-booker/AuthSessionHelper';
import type {
  CreateBookingResponse,
  UpdateBookingPayload,
} from '../../../../../../src/api/restful-booker/BookingApi';

test.describe('PUT /booking/{id} - positive', () => {
  test('should update full booking with valid auth token', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);

    const createPayload = BookingPayloadBuilder.valid();
    const createResponse = await bookingApi.create(createPayload);
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

    const authCookie = await getAuthCookie(apiClient);

    const updatePayload: UpdateBookingPayload = {
      firstname: 'Updated',
      lastname: 'Booking',
      totalprice: 275,
      depositpaid: false,
      bookingdates: {
        checkin: '2026-11-01',
        checkout: '2026-11-05',
      },
      additionalneeds: 'Lunch',
    };
    const updateResponse = await bookingApi.update(created.bookingid, updatePayload, {
      Cookie: authCookie,
    });

    expect(updateResponse.status()).toBe(200);
    const updated = (await updateResponse.json()) as UpdateBookingPayload;
    expect(updated).toEqual(updatePayload);
  });
});
