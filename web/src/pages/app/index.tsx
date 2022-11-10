import { getAccessToken, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function App() {
    const { user } = useUser();

    return (
        <>
            <h1>Home</h1>
            <a href="/api/auth/logout">Logout</a>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
    );
}

export const getServerSideProps = withPageAuthRequired({
    getServerSideProps: async ({req,res}) => {
        console.log(getAccessToken(req, res));

        return {
            props: {}
        }
    }
});
