import { gql, useQuery } from '@apollo/client';
import {
  getAccessToken,
  useUser,
  withPageAuthRequired,
} from '@auth0/nextjs-auth0';
import { withApolloClient } from '../../lib/withApollo';

export function Home({ data }) {
  const { user } = useUser();

  return (
    <>
      <h1 className="text-violet-500">Home</h1>
      <pre>{JSON.stringify(data.product, null, 2)}</pre>

      <a href="/api/auth/logout">Logout</a>
      <pre>{JSON.stringify(user, null, 2)}</pre>
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
