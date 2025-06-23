'use client';
import { useState } from "react";
import useAuth from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import api from "../lib/api";
import { loginService, registerService } from "../api/authService";

export const AuthForm = ({ mode }: { mode: 'login' | 'register' }) => {
    const [form, setForm] = useState({ email: '', password: '', name: '' });
    const { login } = useAuth();
    const router = useRouter();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (mode === "login") {
                const res = await loginService({ email: form.email, password: form.password });
                login(res.data.data.token.accessToken);
                router.push('/');
            } else {
                const res = await registerService({
                    name: form.name,
                    email: form.email,
                    password: form.password
                });
                router.push('/login');
            };

        } catch (error) {
            console.error('✌️Lỗi rồi !', error);
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            {mode === 'register' && (
                <input
                    placeholder="Tên"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
            )}
            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</button>
        </form>
    )
}
