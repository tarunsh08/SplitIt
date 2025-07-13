import AuthLayout from "../features/auth/components/AuthLayout";
import SignupForm from "../features/auth/components/Signup";

const Signup = () => {
  return (
    <AuthLayout title="Create Account" subtitle="Sign up for a new account">
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
