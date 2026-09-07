import { expect, test } from '../../../../../src/fixtures/ApiFixture';
import { BookingApi } from '../../../../../src/api/restful-booker/BookingApi';
import { expectNotFound } from '../../../../../src/assertions/HttpAssertions';

test.describe('GET /booking - negative', () => {
  test('should return 404 for non-existing booking id', async ({ apiClient }) => {
    const bookingApi = new BookingApi(apiClient);
    const response = await bookingApi.getById(999999999);

    await expectNotFound(response);
  });
});
