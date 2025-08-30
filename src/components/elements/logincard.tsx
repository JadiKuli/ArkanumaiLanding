import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Input from "../ui/input";
import { useState } from "react";
import { authService } from "@/services/api/auth-service";
import { LoginSchema, type LoginType } from "@/validation/login";
import { toast } from "sonner";
import z from "zod";

interface Props {
  onClose?: () => void;
  onRegister?: () => void;
}

export default function LoginCard(props: Props) {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginType, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      LoginSchema.parse(data);
      toast.info("Logging in...");

      await authService.login(data.username, data.password);
      window.location.href = "/";
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof LoginType, string>> = {};
        error.issues.forEach((issue) => {
          errors[issue.path[0] as keyof LoginType] = issue.message;
        });
        setErrors(errors);
      } else {
        toast.error("Invalid credentials!, Please try again.");
      }

      console.error(error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-night-3 text-center">Login Area</CardTitle>
        <CardDescription className="text-night-3 text-center">
          Input your username and password
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div
          className={`text-pink space-y-1 text-sm ${
            errors.username || errors.password ? "block" : "hidden"
          }`}
        >
          {errors.username && <p>Username must be at least 3 characters</p>}
          {errors.password && <p>Password must be at least 6 characters</p>}
        </div>

        <Input
          label="username"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <Input
          label="password"
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
      </CardContent>
      <CardContent className="text-night-3 text-sm">
        Don't have an account?{" "}
        <span
          className="text-night-3 text-pink cursor-pointer font-semibold"
          onClick={props.onRegister}
        >
          Register Now!
        </span>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="bg-night-3 w-full cursor-pointer"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Button
          className="bg-pink hover:bg-pink/50 w-full cursor-pointer transition duration-300"
          onClick={props.onClose}
        >
          Close
        </Button>
      </CardFooter>
    </Card>
  );
}
