import * as Yup from 'yup';

const today = new Date().toLocaleDateString();

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your full name'),
  username: Yup.string()
    .min(5, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Please enter your username'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string()
    .required('Please enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&*()]{8,}$/,
      'Must Contain At Least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  dateOfBirth: Yup.date('Date must be filled!')
    .nullable()
    .required('Please enter your date of birth')
    .max(today, `Date needs to be before ${today}`),
});

export default SignupSchema;
