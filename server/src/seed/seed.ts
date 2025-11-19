import { DataSource } from 'typeorm';
import { Item } from '../items/item.entity';

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'db',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'testdb',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});

async function seed() {
    await dataSource.initialize();
    const repo = dataSource.getRepository(Item);

    const items = [];
    for (let i = 1; i <= 50000; i++) {
        items.push({ name: `Item ${i}` });
    }

    await repo.save(items);
    console.log('Seeded 50,000 items');
    process.exit(0);
}

seed();
