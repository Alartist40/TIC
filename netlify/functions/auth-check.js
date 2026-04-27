/**
 * Check if user is authenticated via Netlify Identity
 * Returns user data if authenticated, null if not
 */

exports.handler = async (event, context) => {
    const user = context.clientContext?.user;

    if (!user) {
        return {
            statusCode: 401,
            body: JSON.stringify({ authenticated: false })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            authenticated: true,
            user: {
                id: user.id,
                email: user.email
            }
        })
    };
};
