import { Card, Title, Text } from '@tremor/react';
// import { queryBuilder } from '../lib/planetscale';
import Search from './search';
// import UsersTable from './table';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  // const users = await queryBuilder
  //   .selectFrom('users')
  //   .select(['id', 'name', 'username', 'email'])
  //   .where('name', 'like', `%${search}%`)
  //   .execute();
  const users = [
    {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com'
    },
    {
      id: 2,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'janedoe@example.com'
    },
    {
      id: 3,
      name: 'Bob Smith',
      username: 'bobsmith',
      email: 'bobsmith@example.com'
    },
    {
      id: 4,
      name: 'Alice Brown',
      username: 'alicebrown',
      email: 'alicebrown@example.com'
    },
    {
      id: 5,
      name: 'Tom Wilson',
      username: 'tomwilson',
      email: 'tomwilson@example.com'
    },
    {
      id: 6,
      name: 'Sarah Lee',
      username: 'sarahlee',
      email: 'sarahlee@example.com'
    },
    {
      id: 7,
      name: 'Peter Lee',
      username: 'peterlee',
      email: 'peterlee@example.com'
    },
    {
      id: 8,
      name: 'Emily Wang',
      username: 'emilywang',
      email: 'emilywang@example.com'
    },
    {
      id: 9,
      name: 'David Chen',
      username: 'davidchen',
      email: 'davidchen@example.com'
    },
    {
      id: 10,
      name: 'Linda Park',
      username: 'lindapark',
      email: 'lindapark@example.com'
    }
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search />
      <Card className="mt-6">
        {/* <UsersTable users={users} /> */}
      </Card>
    </main>
  );
}
