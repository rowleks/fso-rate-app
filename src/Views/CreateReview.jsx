import { Button, View } from "react-native";
import { useFormik } from "formik";
import theme from "../context/theme";
import * as yup from "yup";
import { useNavigate } from "react-router-native";
import { useReview } from "../hooks/useReview";
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

export const CreateReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    repositoryOwnerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const validationSchema = yup.object().shape({
    repositoryOwnerName: yup
      .string()
      .required("Repository owner's username is required"),
    repositoryName: yup.string().required("Repository's name is required"),
    rating: yup
      .number()
      .typeError("Rating must be a number")
      .min(0, "Rating must be between 0 and 100")
      .max(100, "Rating must be between 0 and 100")
      .required("Rating is required"),
    text: yup.string(),
  });

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <FormikTextInput
          formik={formik}
          name="repositoryOwnerName"
          placeholder="Repository owner's username"
        />
        <FormikTextInput
          formik={formik}
          name="repositoryName"
          placeholder="Repository's name"
        />
        <FormikTextInput
          formik={formik}
          name="rating"
          placeholder="Rating between 0 and 100"
          keyboardType="numeric"
        />
        <FormikTextInput
          formik={formik}
          name="text"
          placeholder="Review"
          multiline
        />
        <Button title="Create a review" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useReview();

  const onSubmit = async (values) => {
    const { repositoryOwnerName, repositoryName, rating, text } = values;

    try {
      const repoId = await createReview({
        ownerName: repositoryOwnerName,
        repositoryName,
        rating: Number(rating),
        text,
      });

      navigate(`/repository/${repoId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewContainer onSubmit={onSubmit} />;
};

export default CreateReview;
