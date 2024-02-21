import { useContext } from "react";
import { DialogContext } from "../../context/dialog";
import { useMutation } from "@apollo/client";
import { UPLOAD_FACILITY_PVMETRICS } from "../../graphql/mutations/facilities";
import { handleGraphQLError } from "../../utils.ts/handleGraphQLError";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { GET_FACILITY } from "../../graphql/queries/facilities";

const uploadMetricsFormSchema = yup.object().shape({
  upload: yup
    .mixed()
    .test(
      "is-csv",
      "File must be a CSV",
      (value) => value && value[0].type === "text/csv"
    ),
});

interface Form {
  upload: File;
}

interface UploadMetricsProps {
  facilityId: string;
}

export default function UploadMetricsForm({ facilityId }: UploadMetricsProps) {
  const { openDialog, closeDialog } = useContext(DialogContext);
  const [uploadPVMetrics] = useMutation(UPLOAD_FACILITY_PVMETRICS, {
    onCompleted: () => {
      closeDialog();
    },
    onError: (error) => {
      openDialog(handleGraphQLError(error));
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(uploadMetricsFormSchema),
  });

  const handleUpload = (data: Form) => {
    uploadPVMetrics({
      variables: {
        facilityId,
        upload: data.upload,
      },
      refetchQueries: [{ query: GET_FACILITY, variables: { facilityId } }],
    });
  };

  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Upload PV Performance Metrics
      </Typography>
      <Box component="form" onSubmit={handleSubmit(handleUpload)}>
        <TextField
          type="file"
          required
          fullWidth
          id="upload"
          label="CSV File"
          autoFocus
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
          {...register("upload")}
          error={!!errors.upload}
          helperText={errors.upload?.message}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          size="large"
        >
          Upload
        </Button>
      </Box>
    </>
  );
}
