import AuthLayout from "../features/auth/components/AuthLayout";
import LoginForm from "../features/auth/components/Login";

const Login = () => {
  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your account">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
