export interface User {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthday?: Date;
}
