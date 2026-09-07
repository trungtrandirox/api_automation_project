import { expect, test } from '../../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { expectBadRequest } from '../../../../../../src/assertions/HttpAssertions';
import { getAuthCookie } from '../../../../../../src/helpers/restful-booker/AuthSessionHelper';
import type { CreateBookingResponse } from '../../../../../../src/api/restful-booker/BookingApi';

test.describe('PUT /booking/{id} - validation', () => {
  test('should return 400 when required lastname is missing', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);

    const createResponse = await bookingApi.create(BookingPayloadBuilder.valid());
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

    const authCookie = await getAuthCookie(apiClient);

    const invalidPayload = {
      firstname: 'OnlyFirstName',
      totalprice: 200,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-11-01',
        checkout: '2026-11-03',
      },
    };
    const updateResponse = await bookingApi.update(created.bookingid, invalidPayload, {
      Cookie: authCookie,
    });

    await expectBadRequest(updateResponse);
  });

  test('should convert wrong totalprice type to null (current behavior)', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);

    const createResponse = await bookingApi.create(BookingPayloadBuilder.valid());
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

    const authCookie = await getAuthCookie(apiClient);

    const invalidPayload = {
      firstname: 'TypeCase',
      lastname: 'Validation',
      totalprice: 'wrong-type',
      depositpaid: true,
      bookingdates: {
        checkin: '2026-11-01',
        checkout: '2026-11-03',
      },
    };
    const updateResponse = await bookingApi.update(created.bookingid, invalidPayload, {
      Cookie: authCookie,
    });

    expect(updateResponse.status()).toBe(200);
    const body = (await updateResponse.json()) as { totalprice: number | null };
    expect(body.totalprice).toBeNull();
  });
});
