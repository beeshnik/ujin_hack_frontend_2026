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
import type { Session } from "@/entities/session/model/types";
import { ROUTES } from "@/shared/config/route-paths";
import { registerSchema, type RegisterFormValues } from "../model/schema.ts";
import { useLogin, useRegister } from "@/shared/api/generated/auth/auth";

export function RegistrationForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useSessionStore((s) => s.setSession);

  const {
    mutate: registerUser,
    data: registerResponse,
    isError,
    isPending,
    error,
  } = useRegister();

  const from =
    (location.state as { from?: Location })?.from?.pathname || ROUTES.LOGIN;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { login: "", password: "", passwordReturn: "", name: "" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    registerUser({
      data: {
        name: data.name,
        login: data.login,
        password: data.password,
      },
    });
  };

  useEffect(() => {
    if (registerResponse?.status === 201) {
      navigate(from, { replace: true });
    } else if (registerResponse?.status === 409) {
      errors.password &&
        (errors.password.message =
          registerResponse?.data.message || "Ошибка в паре логин/пароль");
    } else {
      errors.password && (errors.password.message = "Неизвестная ошибка");
    }
  }, [registerResponse]);


  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Регистрация</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Имя</Label>
          <Input
            id="name"
            placeholder="Ваше имя"
            autoComplete="email"
            disabled={isPending}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

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

        <div className="space-y-2">
          <Label htmlFor="passwordReturn">Повторите пароль</Label>
          <Input
            id="passwordReturn"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isPending}
            {...register("passwordReturn")}
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
          Регистрация
        </Button>
      </form>

      <Button
        className="w-full"
        onClick={() => {
          navigate(ROUTES.LOGIN);
        }}
      >
        Войти в систему
      </Button>
    </div>
  );
}
