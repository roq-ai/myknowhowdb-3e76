import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getSuggestedEditById, updateSuggestedEditById } from 'apiSdk/suggested-edits';
import { Error } from 'components/error';
import { suggestedEditValidationSchema } from 'validationSchema/suggested-edits';
import { SuggestedEditInterface } from 'interfaces/suggested-edit';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ResourceInterface } from 'interfaces/resource';
import { UserInterface } from 'interfaces/user';
import { getResources } from 'apiSdk/resources';
import { getUsers } from 'apiSdk/users';

function SuggestedEditEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<SuggestedEditInterface>(
    () => (id ? `/suggested-edits/${id}` : null),
    () => getSuggestedEditById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SuggestedEditInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSuggestedEditById(id, values);
      mutate(updated);
      resetForm();
      router.push('/suggested-edits');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<SuggestedEditInterface>({
    initialValues: data,
    validationSchema: suggestedEditValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Suggested Edit
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="suggested_content" mb="4" isInvalid={!!formik.errors?.suggested_content}>
              <FormLabel>Suggested Content</FormLabel>
              <Input
                type="text"
                name="suggested_content"
                value={formik.values?.suggested_content}
                onChange={formik.handleChange}
              />
              {formik.errors.suggested_content && (
                <FormErrorMessage>{formik.errors?.suggested_content}</FormErrorMessage>
              )}
            </FormControl>
            <AsyncSelect<ResourceInterface>
              formik={formik}
              name={'resource_id'}
              label={'Select Resource'}
              placeholder={'Select Resource'}
              fetcher={getResources}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.title}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'guest_contributor_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'suggested_edit',
  operation: AccessOperationEnum.UPDATE,
})(SuggestedEditEditPage);
