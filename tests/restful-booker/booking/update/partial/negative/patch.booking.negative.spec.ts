import { expect, test } from '../../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { expectForbidden } from '../../../../../../src/assertions/HttpAssertions';
import type { CreateBookingResponse } from '../../../../../../src/api/restful-booker/BookingApi';

test.describe('PATCH /booking/{id} - negative', () => {
  test('should return 403 when patching without auth token', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const createResponse = await bookingApi.create(BookingPayloadBuilder.valid());
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

    const patchResponse = await bookingApi.patch(created.bookingid, {
      firstname: 'NoAuthPatch',
    });

    await expectForbidden(patchResponse);
  });
});
