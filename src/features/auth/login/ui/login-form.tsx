import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import { useSessionStore } from "@/entities/session/model/session-store";
import {
  getMockUserByRole,
  createSession,
  QUICK_LOGIN_ROLES,
} from "@/entities/session/model/mock-users";
import type { Session, UserRole } from "@/entities/session/model/types";
import { ROUTES } from "@/shared/config/route-paths";
import { loginSchema, type LoginFormValues } from "../model/schema";
import { useLogin } from "@/shared/api/generated/auth/auth";

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useSessionStore((s) => s.setSession);

  const { mutate: login, data: loginResponse, isError, isPending, error } = useLogin();

  const from =
    (location.state as { from?: Location })?.from?.pathname || ROUTES.DASHBOARD;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    login({ data: data });
  };

  useEffect(() => {
    if (loginResponse?.status === 200) {
      const loginData = loginResponse.data
      setSession({
        user: {
          role: "admin",
        },
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
        permissions: [],
      } as Session);
      navigate(from, { replace: true });
    } else if (loginResponse?.status === 401) {
      errors.password && ( errors.password.message =
        loginResponse?.data.message || "Ошибка в паре логин/пароль")
    } else {
      errors.password && (errors.password.message = "Неизвестная ошибка")
    }
  }, [loginResponse]);

  // const handleQuickLogin = async (role: UserRole) => {
  //   setServerError(null);
  //   setIsLoading(true);

  //   await new Promise((r) => setTimeout(r, 400));

  //   const user = getMockUserByRole(role);
  //   setSession(createSession(user));
  //   navigate(ROUTES.DASHBOARD, { replace: true });
  // };

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Вход в систему</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
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

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          или быстрый вход
        </span>
      </div>

      {/* <div className="space-y-2">
        {QUICK_LOGIN_ROLES.map(({ role, label }) => (
          <Button
            key={role}
            variant="outline"
            className="w-full"
            disabled={isPending}
            onClick={() => {
              const user = getMockUserByRole(role);
              setValue("login", user.);
              setValue("password", user.password);
              handleQuickLogin(role);
            }}
          >
            {label}
          </Button>
        ))}
      </div> */}
    </div>
  );
}
