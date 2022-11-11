import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useMeQuery } from '../../graphql/generated/graphql';
import { ssrGetProducts } from '../../graphql/generated/page';
import { withApolloClient } from '../../lib/withApollo';

export function Home({ data }: any) {
  const { user } = useUser();
  const { data: me } = useMeQuery();

  return (
    <>
      <a href="/api/auth/logout">Logout</a>

      <h1 className="text-violet-500">Data</h1>
      <pre>-- {JSON.stringify(data, null, 2)}</pre>

      <h1>Me</h1>
      <pre>-- {JSON.stringify(me, null, 2)}</pre>

      <h1>User</h1>
      <pre>-- {JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // return await getServerPageGetProducts({}, ctx);

    return {
      props: {},
    };
  },
});

export default withApolloClient(ssrGetProducts.withPage()(Home));
