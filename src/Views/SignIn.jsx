import { Button, View } from "react-native";
import { useFormik } from "formik";
import theme from "../context/theme";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-native";
import FormikTextInput from "../components/FormikTextInput";

const styles = {
  container: {
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.white,
  },

  formContainer: {
    gap: theme.spacing.small + 6,
  },

  input: {
    padding: theme.spacing.small + 2,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: theme.borderRadius.small,
  },

  inputError: {
    borderColor: theme.colors.error,
  },
};

export const SignInContainer = ({ onSubmit }) => {
  const initialValues = { username: "", password: "" };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <FormikTextInput
          formik={formik}
          name="username"
          placeholder="Username"
        />
        <FormikTextInput
          formik={formik}
          name="password"
          placeholder="Password"
          secureTextEntry
        />
        <Button title="Sign In" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;
