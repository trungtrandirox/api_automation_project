import type { BookingPayload } from '../../api/restful-booker/BookingApi';

export class BookingPayloadBuilder {
  static valid(overrides?: Partial<BookingPayload>): BookingPayload {
    return {
      firstname: 'Trung',
      lastname: 'QA',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-09-10',
        checkout: '2026-09-15',
      },
      additionalneeds: 'Breakfast',
      ...overrides,
    };
  }
}
