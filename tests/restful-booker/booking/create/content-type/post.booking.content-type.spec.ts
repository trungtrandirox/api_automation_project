import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import { BookingPayloadBuilder } from '../../../../../src/builders/restful-booker/BookingPayloadBuilder';
import { expectInternalServerError } from '../../../../../src/assertions/HttpAssertions';

test.describe('POST /booking - content-type', () => {
  test('should return 500 when Content-Type is text/plain', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const payload = BookingPayloadBuilder.valid();

    const response = await bookingApi.create(payload, {
      'Content-Type': 'text/plain',
    });
    await expectInternalServerError(response);
  });
});
