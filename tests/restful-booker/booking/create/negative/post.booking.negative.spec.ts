import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { expectInternalServerError } from '../../../../../src/assertions/HttpAssertions';

test.describe('POST /booking - negative', () => {
  test('should return 500 when missing required lastname', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const basePayload = BookingPayloadBuilder.valid();
    const payload = {
      firstname: basePayload.firstname,
      totalprice: basePayload.totalprice,
      depositpaid: basePayload.depositpaid,
      bookingdates: basePayload.bookingdates,
      additionalneeds: basePayload.additionalneeds,
    };

    const response = await bookingApi.create(payload);
    await expectInternalServerError(response);
  });
});
