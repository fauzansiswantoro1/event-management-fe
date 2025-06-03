"use client";

import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export default function VerifyPage({ token }: { token: string }) {
  const [msg, setMsg] = useState<string>("");
  const onVerify = async () => {
    try {
      setMsg("Waiting ...");
      const { data } = await axios.patch(
        "/auth/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg(data.message);
    } catch (err) {
      if (err instanceof AxiosError) {
        setMsg(err.response?.data?.message);
      } else {
        setMsg("Verification Failed!");
      }
    }
  };

  useEffect(() => {
    onVerify();
  });

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <h1 className="text-6xl text-indigo-500">{msg}</h1>
    </div>
  );
}
