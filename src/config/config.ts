import dotenv from 'dotenv';
import { Config } from '../interfaces/config';

if (process.env.NODE_ENV === 'production') {
	dotenv.config({ path: '.env.production' });
} else {
	dotenv.config({ path: '.env.development' });
}
console.log(process.env.MONGODB_URI);
const ENV: string = process.env.NODE_ENV || 'development';

const CONFIG: Config = {
	development: {
		app: {
			PORT: process.env.PORT || 4000
		},
		db: {
			URI: process.env.MONGODB_URI
		}
	},
	production: {
		app: {
			PORT: process.env.PORT || 4001
		},
		db: {
			URI: process.env.MONGODB_URI
		}
	}
};

export default CONFIG[ENV];
