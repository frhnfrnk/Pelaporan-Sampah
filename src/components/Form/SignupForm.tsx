"use client";
import React, { useEffect, useState } from "react";
import InputField from "../Field/InputField";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "../ui/toaster";
import { toast } from "../ui/use-toast";
import InputPasswordField from "../Field/InputPasswordField";
import { useAppDispatch } from "@/lib/store";
import { signup } from "@/lib/features/auth/authSlice";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import InputPhoneNumberField from "../Field/InputPhoneNumber";
import Loading from "../Loading";
import Link from "next/link";

interface SignupFormProps {
  isModal?: boolean;
  children?: React.ReactNode;
}

const SignupForm: React.FC<SignupFormProps> = ({
  isModal = false,
  children,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signUpData, setSignUpData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    retypePassword: "",
    role: "user",
  });

  const pathName = usePathname();

  const [disableSubmit, setDisableSubmit] = useState(true);
  const [errMessage, setErrMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (id: string, value: string) => {
    if (id === "retypePassword" && value !== signUpData.password) {
      if (value !== "") {
        setDisableSubmit(false);
      }
    } else {
      setDisableSubmit(true);
    }

    setSignUpData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = {
      email: signUpData.email,
      password: signUpData.password,
      name: signUpData.name,
      phoneNumber: signUpData.phoneNumber,
      role: signUpData.role,
    };

    dispatch(signup(userData))
      .unwrap()
      .then((res) => {
        toast({
          title: "Sign Up successful",
          description: `Redirecting to Report Page"`,
        });

        setTimeout(() => {
          router.push("/report");
        }, 2000);
      })
      .catch((err: any) => {
        console.log(err);
        let errMessage;
        if (err > 1) {
          errMessage = err.map((error: any) => {
            return error.charAt(0).toUpperCase() + error.slice(1);
          });
        } else {
          errMessage = err.charAt(0).toUpperCase() + err.slice(1);
        }
        setErrMessage(errMessage);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (
      !signUpData.email ||
      !signUpData.name ||
      !signUpData.phoneNumber ||
      !signUpData.password
    ) {
      setDisableSubmit(false);
    }
  }, [signUpData]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form className="w-full p-6" onSubmit={handleSignup}>
          <InputField
            label="Full Name"
            type="text"
            id="name"
            value={signUpData.name}
            onChange={(value) => {
              handleChange("name", value);
            }}
          />
          <InputField
            label="Email Address"
            type="email"
            id="email"
            value={signUpData.email}
            onChange={(value) => {
              handleChange("email", value);
            }}
          />
          <InputPhoneNumberField
            label="Phone Number"
            type="text"
            id="phoneNumber"
            value={signUpData.phoneNumber}
            onChange={(value) => {
              handleChange("phoneNumber", value);
            }}
          />
          <InputPasswordField
            label="Password"
            id="password"
            value={signUpData.password}
            onChange={(value) => {
              handleChange("password", value);
            }}
          />
          <InputPasswordField
            label="Re-type Password"
            id="retypePassword"
            value={signUpData.retypePassword}
            onChange={(value) => {
              handleChange("retypePassword", value);
            }}
          />
          {signUpData.password !== signUpData.retypePassword && (
            <p className="text-red-500 text-right text-sm -mt-2 mb-2">
              Passwords do not match
            </p>
          )}

          {typeof errMessage == "object" ? (
            <ul className="w-full list-decimal px-6">
              {errMessage.map((err: any, index: number) => (
                <li
                  key={index}
                  className="text-red-500 text-left text-sm -mt-2 mb-2"
                >
                  <p>{err}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500 text-left text-sm -mt-2 mb-2">
              {errMessage}
            </p>
          )}
          <div className="flex flex-col gap-3 mt-5">
            <input
              type="submit"
              disabled={!disableSubmit}
              value={"Sign up"}
              className="bg-primary text-white rounded font-medium py-2 cursor-pointer"
            />
          </div>

          <p className="text-center text-sm my-3">
            Already have an account? {children}
          </p>
          <Link
            href={
              pathName === "/auth/petugas/signup"
                ? "/auth/signup"
                : "/auth/petugas/signup"
            }
          >
            <p className="text-center text-sm my-3 underline text-blue">
              Signup as{" "}
              {pathName === "/auth/petugas/signup" ? "User" : "Petugas"}
            </p>
          </Link>
          <Toaster />
        </form>
      )}
    </>
  );
};

export default SignupForm;
