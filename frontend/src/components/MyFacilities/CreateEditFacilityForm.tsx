import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  CREATE_FACILITY,
  UPDATE_FACILITY,
} from "../../graphql/mutations/facilities";
import { useMutation } from "@apollo/client";
import { MY_FACILITIES } from "../../graphql/queries/facilities";
import { FacilityType } from "../../routes/MyFacilities";
import { useErrorHandler } from "../../hook/useErrorHandler";
import { useDialog } from "../../hook/useDialog";

interface Form {
  id?: string;
  name: string;
  latitude: number;
  longitude: number;
}

const createUpdateFormSchema = yup.object({
  id: yup.string().optional(),
  name: yup.string().required("Name is required"),
  latitude: yup
    .number()
    .typeError("Must be a number")
    .required("Latitude is required"),
  longitude: yup
    .number()
    .typeError("Must be a number")
    .required("Longitude is required"),
});

export default function CreateFacilityForm({
  facility,
}: {
  facility?: FacilityType;
}) {
  const { closeDialog, openDialog } = useDialog();
  const { handleGraphQLError } = useErrorHandler();
  const [createFacility] = useMutation(CREATE_FACILITY, {
    onCompleted: () => {
      closeDialog();
    },
    onError: (error) => {
      const message = handleGraphQLError(error);
      openDialog(<Typography>{message}</Typography>);
    },
  });

  const [updateFacility] = useMutation(UPDATE_FACILITY, {
    onCompleted: () => {
      closeDialog();
    },
    onError: (error) => {
      const message = handleGraphQLError(error);
      openDialog(message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver<Form>(createUpdateFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: facility?.name || "",
      latitude: facility?.latitude || null,
      longitude: facility?.longitude || null,
    } as Form,
  });

  const onCreateSubmit = (data: Form) => {
    createFacility({
      variables: {
        input: data,
      },
      refetchQueries: [MY_FACILITIES],
    });
    reset();
  };

  const onEditSubmit = (data: Form) => {
    updateFacility({
      variables: {
        input: data,
      },
      refetchQueries: [MY_FACILITIES],
    });
    reset();
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Create Facility
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(facility ? onEditSubmit : onCreateSubmit)}
      >
        {facility && (
          <input
            type="hidden"
            id="id"
            name="id"
            value={facility._id}
            {...register("id")}
          />
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Facility Name"
          autoFocus
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message as string}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Latitude"
          type="number"
          id="latitude"
          inputProps={{ step: "any" }}
          {...register("latitude")}
          error={!!errors.latitude}
          helperText={errors.latitude?.message as string}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Longitude"
          type="number"
          id="longitude"
          inputProps={{ step: "any" }}
          {...register("longitude")}
          error={!!errors.latitude}
          helperText={errors.latitude?.message as string}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          size="large"
        >
          {facility ? "Update" : "Create"}
        </Button>
      </Box>
    </>
  );
}
