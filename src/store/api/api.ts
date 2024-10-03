import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ShipmentResponse } from '../../types/type';

export const bostaApi = createApi({
  reducerPath: 'bostaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tracking.bosta.co/shipments/' }),
  endpoints: (builder) => ({
    getShipment: builder.query<ShipmentResponse, string>({
      query: (trackingNumber) => `track/${trackingNumber}`,
    }),
  }),
});

export const { useGetShipmentQuery } = bostaApi;
