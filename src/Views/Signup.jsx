import { Button, View } from "react-native";
import { useFormik } from "formik";
import theme from "../context/theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import FormikTextInput from "../components/FormikTextInput";
import { useSignUp } from "../hooks/useAuth";

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

export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, "Username must be at least 5 characters")
      .max(30, "Username must be at most 30 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters")
      .max(50, "Password must be at most 50 characters")
      .required("Password is required"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

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
        <FormikTextInput
          formik={formik}
          name="passwordConfirmation"
          placeholder="Password confirmation"
          secureTextEntry
        />
        <Button title="Sign Up" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
