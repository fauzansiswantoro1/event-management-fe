"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import {
  Field,
  Form,
  Formik,
  type FormikHelpers,
  type FormikProps,
} from "formik";
import { signIn } from "next-auth/react";
// import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginSchema = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "min 6 character"),
});

interface ILoginForm {
  email: string;
  password: string;
}

export default function FormLogin() {
  const initialValues: ILoginForm = {
    email: "",
    password: "",
  };

  const onLogin = async (
    value: ILoginForm,
    action: FormikHelpers<ILoginForm>
  ) => {
    try {
      const { data } = await axios.post("/auth/login", value);
      await signIn("credentials", {
        redirectTo: "/",
        name: data.user?.name,
        email: data.user?.email,
        avatar: data.user?.avatar,
        userToken: data.token,
      });

      toast.success(data.message);
      action.resetForm();
    } catch (err) {
      console.log(err);
      action.setSubmitting(false);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/event-picture.png')`,
      }}
    >
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome Back
          </CardTitle>
          <p className="text-gray-600">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={(values, action) => {
              onLogin(values, action);
            }}
          >
            {(props: FormikProps<ILoginForm>) => {
              const { touched, errors, isSubmitting } = props;
              return (
                <Form className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      type="text"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                    {touched.email && errors.email && (
                      <div className="text-red-500 text-xs">{errors.email}</div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Field
                      name="password"
                      type="password"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    />
                    {touched.password && errors.password && (
                      <div className="text-red-500 text-xs">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium text-sm rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {isSubmitting ? "Loading ..." : "Sign in"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
