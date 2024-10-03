export interface ShipmentResponse {
    provider: string;
    CurrentStatus: {
      state: string;
      timestamp: string;
    };
    PromisedDate: string;
    TrackingNumber: string;
    TrackingURL: string;
    SupportPhoneNumbers: string[];
    TransitEvents: TransitEvent[];
    CreateDate: string;
    isEditableShipment: boolean;
    nextWorkingDay?: WorkingDay[];
  }
  
  export interface TransitEvent {
    state: string;
    timestamp: string;
    hub?: string;
    reason?: string;
  }
  
  export interface WorkingDay {
    dayDate: string;
    dayName: string;
  }
  