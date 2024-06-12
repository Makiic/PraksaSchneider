export interface Invitation {
    id?: number;
    eventId: number;
    email: string;
    status: InvitationStatus;
  
  }
  
  export enum InvitationStatus {
    Pending = 'Pending',
    Sent = 'Sent',
    Accepted = 'Accepted',
    Declined = 'Declined'
  }
  