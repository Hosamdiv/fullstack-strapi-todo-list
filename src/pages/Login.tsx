import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { LOGIN_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup.js";
import { loginSchema } from "../validation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "../config/axios.config";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";

interface IFormInput {
  identifier: string;
  password: string;
}
export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("Data Register", data);
    setIsLoading(true);

    try {
      //  ** 2 - Fulfilled => SUCCESS => (OPTIONAL)

      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      console.log(status);
      console.log(resData);

      if (status === 200) {
        toast.success(
          "You will navigate to the home page after 2 seconds to login.",
          {
            position: "bottom-center",
            duration: 1500,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          }
        );

        localStorage.setItem("loggedInUser",JSON.stringify(resData));

        setTimeout(() => {
          location.replace("/")
        }, 2000);
      }
    } catch (error) {
      //  ** 3 - Rejected => FAILED => (OPTIONAL)
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const renderLoginrForm = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />

        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">
        Login to get access!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        {renderLoginrForm}

        <Button isLoading={isLoading} fullWidth>
          Login
        </Button>
      </form>
    </div>
  );
};
