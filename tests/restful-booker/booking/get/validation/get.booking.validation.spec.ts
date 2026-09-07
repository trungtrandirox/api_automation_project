import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import { expectNotFound } from '../../../../../src/assertions/HttpAssertions';

test.describe('GET /booking - validation', () => {
  test('should return 404 when booking id format is invalid', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const response = await bookingApi.getById('abc');

    await expectNotFound(response);
  });
});
