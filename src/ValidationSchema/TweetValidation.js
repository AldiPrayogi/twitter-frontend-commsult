import * as Yup from 'yup';

const CreateTweetSchema = Yup.object().shape({
  message: Yup.string()
    .max(240, 'Too Long!')
    .required('Please fill your tweets'),
});

export default CreateTweetSchema;
