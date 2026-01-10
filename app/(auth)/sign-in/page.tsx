'use client';
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";

interface SignInFormData {
  email: string;
  password: string;
}

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    }, mode: 'onBlur'
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="form-title mt-25 ">Log In Your Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          validation={{ required: "Email is required", pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email" }}
        />

        <InputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter a strong password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required" }}
        />

        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Logging In...' : 'Log In'}
        </Button>

        <FooterLink text="Don't have an account? " linkText="Sign Up" href="/sign-up" />
      </form>
    </>
  )
}

export default SignInPage;