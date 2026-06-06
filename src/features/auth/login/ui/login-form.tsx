import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useSessionStore } from "@/entities/session/model/session-store";
import type { Session } from "@/entities/session/model/types";
import { ROUTES } from "@/shared/config/route-paths";
import { loginSchema, type LoginFormValues } from "../model/schema";
import { useLogin } from "@/shared/api/generated/auth/auth";


export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useSessionStore((s) => s.setSession);

  const {
    mutate: login,
    data: loginResponse,
    isPending,
    error,
  } = useLogin();

  const from =
    (location.state as { from?: Location })?.from?.pathname || ROUTES.HOUSES;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    login({
      data: {
        login: data.login,
        password: data.password,
      },
    });
  };

  useEffect(() => {
    if (loginResponse?.status === 200) {
      const loginData = loginResponse.data;
      setSession({
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
        permissions: [],
      } as Session);
      navigate(from, { replace: true });
    } else if (loginResponse?.status === 401) {
      errors.password &&
        (errors.password.message =
          loginResponse?.data.message || "Ошибка в паре логин/пароль");
    } else {
      errors.password && (errors.password.message = "Неизвестная ошибка");
    }
  }, [loginResponse]);

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Вход в систему</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Login</Label>
          <Input
            id="email"
            placeholder="login"
            autoComplete="email"
            disabled={isPending}
            {...register("login")}
          />
          {errors.login && (
            <p className="text-sm text-destructive">{errors.login.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isPending}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Войти
        </Button>
      </form>

      <Button
        className="w-full"
        onClick={() => {
          navigate(ROUTES.REGISTRATION);
        }}
      >
        Регистрация
      </Button>
    </div>
  );
}
