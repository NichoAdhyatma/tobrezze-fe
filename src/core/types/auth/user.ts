export type User = {
    id: string;
    email?: string;
    email_confirmed_at?: string;
    user_metadata?: Partial<UserMetadata>;
  };
  
  type UserMetadata = {
    email: string;
    name: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  
  