declare module "@/lib/firebase" {
	import type { Firestore } from 'firebase/firestore';
	import type { Auth } from 'firebase/auth';
	import type { FirebaseApp } from 'firebase/app';

	export const db: Firestore;
	export const auth: Auth | undefined;
	export const app: FirebaseApp | undefined;
}
