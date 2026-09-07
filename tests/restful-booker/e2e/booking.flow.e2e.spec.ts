import { expect, test } from '../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../src/builders/restful-booker/BookingPayloadBuilder';
import { expectNotFound } from '../../../src/assertions/HttpAssertions';
import { getAuthCookie } from '../../../src/helpers/restful-booker/AuthSessionHelper';
import type {
  CreateBookingResponse,
  BookingPayload,
  UpdateBookingPayload,
} from '../../../src/api/restful-booker/BookingApi';

test.describe('@smoke @e2e booking CRUD flow', () => {
  test('should run create-get-update-patch-delete flow successfully', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const authCookie = await getAuthCookie(apiClient);

    const createPayload = BookingPayloadBuilder.valid({ additionalneeds: 'Breakfast' });
    const createResponse = await bookingApi.create(createPayload);
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;
    expect(created.bookingid).toBeGreaterThan(0);

    const getResponse = await bookingApi.getById(created.bookingid);
    expect(getResponse.status()).toBe(200);
    const booking = (await getResponse.json()) as BookingPayload;
    expect(booking).toEqual(createPayload);

    const updatePayload: UpdateBookingPayload = {
      firstname: 'UpdatedE2E',
      lastname: 'Flow',
      totalprice: 444,
      depositpaid: false,
      bookingdates: {
        checkin: '2026-12-20',
        checkout: '2026-12-25',
      },
      additionalneeds: 'Lunch',
    };
    const updateResponse = await bookingApi.update(created.bookingid, updatePayload, {
      Cookie: authCookie,
    });
    expect(updateResponse.status()).toBe(200);
    const updated = (await updateResponse.json()) as UpdateBookingPayload;
    expect(updated).toEqual(updatePayload);

    const patchResponse = await bookingApi.patch(
      created.bookingid,
      { firstname: 'PatchedE2E' },
      { Cookie: authCookie },
    );
    expect(patchResponse.status()).toBe(200);
    const patched = (await patchResponse.json()) as UpdateBookingPayload;
    expect(patched.firstname).toBe('PatchedE2E');
    expect(patched.lastname).toBe(updatePayload.lastname);

    const deleteResponse = await bookingApi.delete(created.bookingid, {
      Cookie: authCookie,
    });
    expect(deleteResponse.status()).toBe(201);
    await expect(deleteResponse.text()).resolves.toBe('Created');

    const getAfterDelete = await bookingApi.getById(created.bookingid);
    await expectNotFound(getAfterDelete);
  });
});
