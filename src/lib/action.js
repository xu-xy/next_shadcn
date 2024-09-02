"use server";
import { revalidatePath } from "next/cache";
import { Post, User, Contant } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";


export const addPost = async (formData) => {
    const { title, desc, slug, userId, img } = Object.fromEntries(formData);
    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            userId,
            img
        });
        await newPost.save();
        console.log("save to db")
        revalidatePath('/blog');//清除此路径的缓存数据
        revalidatePath("/admin");
    } catch (err) {
        console.log(err)
        return { error: "Something went wrong!" }
    }
}

export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDb();
        await Post.findByIdAndDelete(id);
        console.log("delete from db")
        revalidatePath('/blog');
    } catch (err) {
        console.log(err)
        return { error: "Something went wrong!" }
    }
}

export const addUser = async (formData) => {
    const { username, email, password, img, isAdmin } = Object.fromEntries(formData);
    try {
        connectToDb();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
            isAdmin
        });

        await newUser.save();
        console.log("saved to db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();

        await Post.deleteMany({ userId: id });
        await User.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};


export const addContant = async (formData) => {
    const { name, email, phone, content } = Object.fromEntries(formData);
    try {
        connectToDb();
        const newContant = new Contant({
            name,
            email,
            phone,
            content
        });
        await newContant.save();
        console.log("save to db")
        revalidatePath('/contact');
    } catch (err) {
        console.log(err)
        return { error: "Something went wrong!" }
    }
}



export const handlerGithubLogin = async () => {
    "use server";
    await signIn("github", { redirectTo: "/blog" });
}

export const handlerLogout = async () => {
    "use server";
    await signOut();
}

export const register = async (formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData);
    if (password !== passwordRepeat) {
        return { error: "Password do not match" }
    }

    try {
        connectToDb();
        const user = await User.findOne({ username });
        if (user) {
            return { error: "Username already exists" }
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img
        });
        await newUser.save();
        console.log("save to db");
        return { success: true }
    } catch (error) {
        return { error: "Something went wrong!" }
    }
}

import { redirect } from "next/navigation";

export const login = async (formData) => {
    const { username, password } = Object.fromEntries(formData);
    try {
        await signIn("credentials", { username, password });
    } catch (err) {
        console.log('login is error:', err.message)
        if (err.message === 'NEXT_REDIRECT') {//暂时找不到登录成功后重定向
            redirect('/blog')
        }
        if (err.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" }
        }
        //Throw new Error(err);
    }
}