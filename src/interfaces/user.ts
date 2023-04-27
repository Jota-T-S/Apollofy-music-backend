export interface User {
	name: string;
	lastName?: string;
	email: string;
	password: string;
	confirmPassword: string;
	birthday?: Date;
}
