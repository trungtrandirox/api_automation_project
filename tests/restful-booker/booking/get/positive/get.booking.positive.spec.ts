import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import type {
  BookingListItem,
  CreateBookingResponse,
  BookingPayload,
} from '../../../../../src/api/restful-booker/BookingApi';

test.describe('GET /booking - positive', () => {
  test('should return booking list', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const response = await bookingApi.list();

    expect(response.status()).toBe(200);
    const body = (await response.json()) as BookingListItem[];
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    expect(typeof body[0]?.bookingid).toBe('number');
  });

  test('should get booking details by id after creating booking', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const payload = BookingPayloadBuilder.valid({ additionalneeds: 'Late checkout' });

    const createResponse = await bookingApi.create(payload);
    expect(createResponse.status()).toBe(200);
    const created = (await createResponse.json()) as CreateBookingResponse;

    const getResponse = await bookingApi.getById(created.bookingid);
    expect(getResponse.status()).toBe(200);
    const actualBooking = (await getResponse.json()) as BookingPayload;
    expect(actualBooking).toEqual(payload);
  });
});
