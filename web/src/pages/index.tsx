import { getSession, useUser } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';

export default function Home() {
  const { error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);
  console.log('🚀 ~session', session);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/app',
        permanent: false,
      },
    };
  }
};
