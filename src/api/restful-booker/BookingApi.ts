import type { APIResponse } from '@playwright/test';
import type { ApiClient } from '../../core/ApiClient';

export type BookingPayload = {
  firstname: string;
  lastname: string;
  totalprice: number | string;
  depositpaid: boolean;
  bookingdates?: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
};

export type CreateBookingResponse = {
  bookingid: number;
  booking: {
    firstname: string;
    lastname: string;
    totalprice: number | null;
    depositpaid: boolean;
    bookingdates: {
      checkin: string;
      checkout: string;
    };
    additionalneeds?: string;
  };
};

export type BookingListItem = {
  bookingid: number;
};

export type UpdateBookingPayload = {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds?: string;
};

export type PatchBookingPayload = Partial<UpdateBookingPayload>;

export class BookingApi {
  constructor(private readonly apiClient: ApiClient) {}

  async create(payload: unknown, headers?: Record<string, string>): Promise<APIResponse> {
    return this.apiClient.post('/booking', {
      headers,
      data: payload,
    });
  }

  async list(headers?: Record<string, string>): Promise<APIResponse> {
    return this.apiClient.get('/booking', { headers });
  }

  async getById(bookingId: number | string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.apiClient.get(`/booking/${bookingId}`, { headers });
  }

  async update(
    bookingId: number,
    payload: UpdateBookingPayload | Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return this.apiClient.put(`/booking/${bookingId}`, {
      headers,
      data: payload,
    });
  }

  async patch(
    bookingId: number,
    payload: PatchBookingPayload | Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<APIResponse> {
    return this.apiClient.patch(`/booking/${bookingId}`, {
      headers,
      data: payload,
    });
  }

  async delete(bookingId: number, headers?: Record<string, string>): Promise<APIResponse> {
    return this.apiClient.delete(`/booking/${bookingId}`, {
      headers,
    });
  }
}
