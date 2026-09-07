import { expect, test } from '../../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { expectForbidden } from '../../../../../../src/assertions/HttpAssertions';
import type {
  CreateBookingResponse,
  UpdateBookingPayload,
} from '../../../../../../src/api/restful-booker/BookingApi';

test.describe('PUT /booking/{id} - negative', () => {
  test('should return 403 when updating without auth token', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const createResponse = await bookingApi.create(BookingPayloadBuilder.valid());
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

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
    const updateResponse = await bookingApi.update(created.bookingid, updatePayload);

    await expectForbidden(updateResponse);
  });
});
