import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShipmentResponse } from "../../types/type";
import { RootState } from "../store";

interface ShipmentState {
  data: ShipmentResponse | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ShipmentState = {
  data: null,
  isLoading: false,
  error: null,
};

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    fetchShipmentStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchShipmentSuccess: (state, action: PayloadAction<ShipmentResponse>) => {
      state.isLoading = false;
      state.data = action.payload;
      console.log(state.data);
      state.error = null;
    },
    fetchShipmentFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearShipmentData: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchShipmentStart,
  fetchShipmentSuccess,
  fetchShipmentFailure,
  clearShipmentData,
} = shipmentSlice.actions;

export const selectShipment = (state: RootState) => state.shipment;

export default shipmentSlice.reducer;
