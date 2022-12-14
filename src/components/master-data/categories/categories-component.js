import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Divider,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
  Snackbar,
  Alert,
} from "@mui/material";

import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../constants/api";
import { useState } from "react";

export const CategoryComponent = (props) => {
  const {onCategorySubmit} = props;

  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const [msg, setMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      category_name: "",
      slug: "",
      image: "",
    },
    validationSchema: Yup.object().shape({
      category_name: Yup.string().required('Category Title is required')
    }),
    onSubmit: (data) => {
      handleSubmit(data);
      console.log(data);
    },
  });


  const handleSubmit = (data) => {
    let formdata = new FormData();

    //Object.keys(data).forEach(k=>{
    formdata.append("category_name", data.category_name);
    formdata.append("slug", data.slug);
    formdata.append("image", data.image);
    //});
    console.log(formdata);

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data;",
      },
    };

    axios
      .post( baseUrl + '/add_category', data, axiosConfig)
      .then((response) => {
        onCategorySubmit();
        if (response.data.success === 1) {
          setSeverity("success");
        } else if(response.data.success === 0){
          setSeverity("warning");
        } else {
          setSeverity("error");
        }
        setOpen(true);
        console.log("in success response", response);
        setMessage(response.data.message);
        formik.resetForm();
      })
      .catch((error) => {
        setSeverity("error");
        setOpen(true);
        setMessage("Failed to create category, please try again later!!!");
      });
      
  };

  return (
    <form autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader=""
          title="Add Category" />
        <Divider />
        <CardContent>
          <Typography sx={{ mb: 3 }}
            variant="h6">
            Basic Info
          </Typography>
          <Grid container
            spacing={3}>
            <Grid item
              md={12}
              xs={12}>
              <TextField
                fullWidth
                label="Category Title"
                name="category_name"
                required
                variant="outlined"
                value={formik.values.category_name}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.category_name)}
                helperText={formik.errors.category_name}
              />
            </Grid>
            <Grid item
              md={12}
              xs={12}>
              <TextField
                fullWidth
                label="Category Slug"
                name="slug"
                required
                variant="outlined"
                value={formik.values.slug}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item
              md={12}
              xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Category Icon
                <input
                  type="file"
                  hidden
                  name="catIcon"
                />
              </Button>
            </Grid>

          </Grid>
        </CardContent>
        <Divider />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}>
            Add Category
          </Button>
        </Box>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        onClose={() => setOpen(false)}
      >
        <Alert sx={{ width: "100%", color: "#fff" }} variant="filled" severity={severity}>
          {msg}
        </Alert>
      </Snackbar>
    </form>
  );
};
