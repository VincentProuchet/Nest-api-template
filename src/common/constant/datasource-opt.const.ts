import { UserEntity } from '../../user/entities/user.entity';

export const dataSourceOpt = {
	type: 'mysql',
	host: process.env.DB_HOST != null ? process.env.DB_HOST : 'localhost',
	port: process.env.DB_PORT != null ? +process.env.DB_PORT : 3306,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	charset: 'utf8mb4',
	synchronize: process.env.NODE_ENV === 'development' ? true : false,
	debug: false,
	migrations: ['./typeorm_migrations/*{.ts,.js}'],
	migrationsTableName: 'migrations_history',
	entities: [UserEntity],
};
