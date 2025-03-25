import { Member } from './Member';

declare module '@/types/User' {
	export interface User {
		url: string;
		username: string;
		email: string;
		is_active: boolean;
		is_staff: boolean;
		member: Member;
	}
}