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
import { RegisterSchema, type RegisterType } from "@/validation/register";
import z from "zod";
import { toast } from "sonner";

interface Props {
  onClose?: () => void;
  onLogin?: () => void;
}

export default function RegisterCard(props: Props) {
  const [data, setData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterType, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      RegisterSchema.parse(data);
      toast.info("Registering User...");

      await authService.register(data.username, data.password);
      toast.success("User Registered Successfully!, Please Login.");
      if (props.onLogin) {
        props.onLogin();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof RegisterType, string>> = {};
        error.issues.forEach((issue) => {
          errors[issue.path[0] as keyof RegisterType] = issue.message;
        });
        setErrors(errors);
      } else {
        toast.error("Something went wrong!, Please try again.");
      }
      console.error(error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-night-3 text-center">
          Register Area
        </CardTitle>
        <CardDescription className="text-night-3 text-center">
          Input your username and password
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div
          className={`text-pink space-y-1 text-sm ${errors.username || errors.password || errors.repeatPassword ? "block" : "hidden"}`}
        >
          {errors.username && <p>Username must be at least 3 characters</p>}
          {errors.password && <p>Password must be at least 6 characters</p>}
          {errors.repeatPassword && <p>Passwords do not match</p>}
        </div>
        <Input
          label="username"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <Input
          label="password"
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <Input
          label="repeat password"
          name="repeatPassword"
          placeholder="Repeat Password"
          type="password"
          onChange={handleChange}
          required
        />
      </CardContent>
      <CardContent className="text-night-3 text-sm">
        Already have an account?{" "}
        <span
          className="text-night-3 text-pink cursor-pointer font-semibold"
          onClick={props.onLogin}
        >
          Login Now!
        </span>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="bg-night-3 w-full cursor-pointer"
          onClick={handleLogin}
        >
          Register
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
