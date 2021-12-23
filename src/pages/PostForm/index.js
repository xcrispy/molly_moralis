import { Heading, Center, useFormControlProps } from "@chakra-ui/react";
import Feed from "../../components/Feed";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Home.module.css";
import { Card, TextInput, TextArea, FileInput } from "grommet";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { VStack, Spacer, HStack, Button, Input, Stack } from "@chakra-ui/react";
import { useMoralisFile, useMoralis } from "react-moralis";

export default function PostForm() {
  //const [title, setTitle] = useState('')
  const Moralis = require("moralis");
  const [description, setDescription] = useState("");
  const [editions, setEditions] = useState("");
  const [price, setPrice] = useState("");
  const [submit, setSubmit] = useState(false);

  const { user } = useMoralis();

  const [highlight, setHighlight] = useState({
    creatorAddress: "",
    title: "",
    description: "",
    file: [],
    editions: "",
    price: "",
  });
  const saveAsset = async () => {
    // save the video to ipfs
    const videodata = highlight.file;
    const vidfile = new Moralis.File(highlight.file.name, videodata);
    const savedVid = await vidfile.saveIPFS();
    console.log(savedVid);
    console.log("saved video to ipfs");
    // save the json to ipfs
    const jsonfile = new Moralis.File("file.json", {
      base64: btoa(JSON.stringify(highlight)),
    });

    const savedFile = await jsonfile.saveIPFS();
    console.log(savedFile);
    console.log("saved json to ipfs");
  };

  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      file: [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      description: Yup.string()
        .max(200, "Must be 200 characters or less")
        .required("Required"),
      file: Yup.mixed()
        .required("We need a video!")
        .test("fileSize", "Your video is too big :(", (values) => {
          console.log(values.size);
          return values && values.size <= 262144000;
        }),
      editions: Yup.number().positive().integer().required("Required"),
      price: Yup.number().positive().required("Required"),
    }),
    onSubmit: (values) => {
      setTimeout(async () => {
        await setHighlight({
          creatorAddress: user.get("ethAddress").toString(),
          title: values.title,
          description: values.description,
          file: values.file,
          editions: values.editions,
          price: values.price,
        });

        //   console.log(values.title)
        //   console.log(values.description)
        //   console.log(values.file)
        //   console.log(values.editions)
        //   console.log(values.price)
      }, 400);
      //  console.log(highlight);
    },
  });

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Card width="large" pad="large" background="dark-1">
          <VStack>
            <Center>
              <Heading>Create Highlight</Heading>
            </Center>
            <Spacer />

            <form onSubmit={formik.handleSubmit}>
              <Stack>
                <label htmlFor="title">Title</label>
                <TextInput
                  id="title"
                  required
                  type="text"
                  {...formik.getFieldProps("title")}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div>{formik.errors.title}</div>
                ) : null}
                <Spacer />

                <label htmlFor="description">Description</label>
                <TextArea
                  id="description"
                  required
                  type="text"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div>{formik.errors.description}</div>
                ) : null}

                <label htmlFor="text">Video Clip</label>
                <TextInput
                  id="file"
                  required
                  name="file"
                  type="file"
                  onChange={(e) =>
                    formik.setFieldValue("file", e.currentTarget.files[0])
                  }
                />
                {formik.touched.file && formik.errors.file ? (
                  <div>{formik.errors.file}</div>
                ) : null}

                <label htmlFor="editions">Editions</label>
                <TextInput
                  id="editions"
                  required
                  type="int"
                  {...formik.getFieldProps("editions")}
                />
                {formik.touched.editions && formik.errors.editions ? (
                  <div>{formik.errors.editions}</div>
                ) : null}

                <label htmlFor="price">Price</label>
                <TextInput
                  id="price"
                  required
                  type="text"
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div>{formik.errors.price}</div>
                ) : null}

                <Spacer />
                <Center>
                  <Button onClick={saveAsset} colorScheme="blue" type="submit">
                    Submit
                  </Button>
                </Center>
              </Stack>
            </form>
          </VStack>
        </Card>
        <Button onClick={() => console.log(highlight)}>check state</Button>
      </main>
      <Footer />
    </>
  );
}
