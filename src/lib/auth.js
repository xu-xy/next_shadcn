import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { User } from '@/lib/models'
import { connectToDb } from '@/lib/utils'
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const {
    //handlers: { GET, POST },
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            //  console.log('callbacks signIn account==', account)
            //  console.log('callbacks signIn profile@@@', profile)
            if (account.provider === 'github') {
                connectToDb();
                try {
                    const user = await User.findOne({ email: profile.email });
                    if (!user) {
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            img: profile.avatar_url
                        });
                        await newUser.save();
                        return true;
                    }
                } catch (err) {
                    console.log(err)
                    return false;

                }
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            // return baseUrl;
            // Allows relative callback URLs
            if (url.startsWith("/")) {
                console.log('`${baseUrl}${url}`', `${baseUrl}${url}`)
                return `${baseUrl}${url}`
            }

            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) {
                console.log('url==', url)
                return url
            }
            console.log('baseUrl==', baseUrl)
            return baseUrl
            //return Promise.resolve('/about'); // 登录成功后重定向到的页面
        },
        ...authConfig.callbacks
    }
});

const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({ username: credentials.username });
        console.log('auth.js login user==', user);
        if (!user) {
            throw new Error('No user found!')
        }
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Password is incorrect');
        }
        return user
    } catch (error) {
        console.log(error);
        throw new Error('Failed to login !');
    }
}