"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, PartyPopper, ArrowLeft } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode: string;
}

const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "name must be at least 2 characters")
    .required("name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  referralCode: Yup.string().optional(),
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (
    values: RegisterFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      setSubmitting(true);

      const { ...registerData } = values;

      const response = await axiosInstance.post("/auth/register", registerData);

      if (response.status === 201) {
        // Registration successful
        toast.success(
          "Registration Successful! Your account has been created. Please check your email inbox for verification."
        );
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          // Handle validation errors from server
          const serverErrors = error.response.data.errors;
          if (serverErrors) {
            Object.keys(serverErrors).forEach((field) => {
              setFieldError(field, serverErrors[field]);
            });
          }
          toast.error("Please check the form for errors and try again.");
        } else if (error.response?.status === 409) {
          // User already exists
          setFieldError("email", "An account with this email already exists");
          toast.error("An account with this email already exists.");
        } else {
          // Generic error
          setFieldError("email", "Registration failed. Please try again.");
          toast.error("Something went wrong. Please try again later.");
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/party-image.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        size="sm"
        className="absolute top-4 left-4 z-20 text-white hover:bg-white/20"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <PartyPopper className="h-12 w-12 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Eventin</h1>
          <p className="text-indigo-200">Start your event journey today!</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-indigo-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center text-gray-800">
              Create Account
            </CardTitle>
            <CardDescription className="text-center">
              Join us and discover amazing events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                referralCode: "",
              }}
              validationSchema={registerSchema}
              onSubmit={(values, formikHelpers) =>
                handleRegister(values, formikHelpers)
              }
            >
              {({ isSubmitting, touched, errors }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      placeholder="Full name"
                      className={`${
                        touched.name && errors.name
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-indigo-500"
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`${
                        touched.email && errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "focus:border-indigo-500"
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className={`pr-10 ${
                          touched.password && errors.password
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-indigo-500"
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`pr-10 ${
                          touched.confirmPassword && errors.confirmPassword
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-indigo-500"
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referralCode">
                      Referral Code (Optional)
                    </Label>
                    <Field
                      as={Input}
                      id="referralCode"
                      name="referralCode"
                      placeholder="Enter referral code"
                      className="focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name="referralCode"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      Have a referral code? Enter it here to get special
                      benefits!
                    </p>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-500"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    size="lg"
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                  </Button>
                </Form>
              )}
            </Formik>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
