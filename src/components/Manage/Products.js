import React from 'react'
import { useState, useEffect } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createProduct, getAllCategory, getAllProducts } from '../../api/Api';
import firebase from 'firebase/compat/app';
import {
    getStorage,
    ref as sRef,
    uploadBytesResumable,
    uploadBytes,
    getDownloadURL 
} from "firebase/storage";
import { ref, runTransaction, getDatabase, set , onValue , get, onChildAdded, onChildChanged, onChildRemoved  } from 'firebase/database';
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { realDB } from './lib/initFirebase';
import 'firebase/database';
import 'firebase/storage';

function Products() {

  //

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isSuccess, setIsSuccess] = useState(false);

  const [isCateSuccess, setIsCateSuccess] = useState(false);

  // Image Uploads Here

  const [fileHere, setfileHere] = useState('');
  const [fileUploadURL, setfileUploadURL] = useState([]);
  const [isLoading, setisLoading] = useState(false);
 
  const loadingHere = () => {
    if(isLoading){
      return(
        <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
      </div>
      )
    }
  }


  const submitImage = (e) => {
    e.preventDefault();
    let file = fileHere;
    setisLoading(true)
    const storage = getStorage();
    const storageRef = sRef(storage, "user_uploads" + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file);


    let imageURLList = [];
    

    uploadTask.on('state_changed', 
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
      }, 
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
    
          setfileUploadURL(downloadURL);
          if(fileUploadURL.length > 0){
            imageURLList = fileUploadURL;
            imageURLList.push(fileUploadURL);
            setfileUploadURL(imageURLList);
        }
          setisLoading(false)
        });
      }
    )

}

  // 

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [productDes, setProductDes] = useState("");
  const [productIngredients, setProductIngredients] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [stock, setStock] = useState();
  const [images, setImages] = useState([]);
  const [usage, setUsage] = useState("");
  const [benifits, setBenifits] = useState("");
  const [productTable, setProductTable] = useState([]);

  const handleImageUpload = (e) => {
    const fileList = e.target.files; // Get uploaded files as FileList
    const fileArray = Array.from(fileList); // Convert FileList to Array

    // Read image files as URLs using FileReader
    Promise.all(
      fileArray.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      })
    )
      .then((imageUrls) => setImages(imageUrls)) // Set image URLs in state
      .catch((error) => console.error(error));
  };

  const [getAllProducts, setGetAllProducts] = useState([]);

  const getAllProductsHandler = () => {
    getAllProducts()
    .then((res) => {
      setGetAllProducts(res)
    })
  }

  useEffect(() => {
    if(isSuccess){
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000);
    }
    // getAllProductsHandler()
  }, [isSuccess])
  


  const handleSubmit = (e) => {
    e.preventDefault();
  
    createProduct({
      productName: productName,
      productCategory: productCategory,
      productPrice: price,
      productDiscountPrice: discount,
      productDescription: productDes,
      productIngredient: productIngredients,
      productDetails: productDetails,
      stock: stock,
      productImages: fileUploadURL,
      howTo: usage,
      benifitsSkinType: benifits
    })
    .then((res) => {
      if(res){
        setIsSuccess(true)
      }
      setProductName("")
      setProductCategory("")
      setPrice("")
      setDiscount("")
      setProductDes("")
      setProductIngredients("")
      setProductDetails("")
      setStock("")
      setImages([]);
      setUsage("")
      setBenifits("")

      console.log("product created", res)
    })
    .catch((err) => {
      console.log("error creating product", err)
    })
    
  }
  
  const onFileInputChange = (event) => {
    const { files } = event.target;
    setfileHere(event.target.files[0])
  }

  const [getAllCategories, setGetAllCategories] = useState([])

  const getAllCategoryHandler = () => {
    getAllCategory()
    .then((res) => {
      console.log('all cates - ', getAllCategories)
      setGetAllCategories(res)
    })
  }
  useEffect(() => {
    if(isCateSuccess){
      setTimeout(() => {
        setIsCateSuccess(false)
      }, 3000);
    }
    getAllCategoryHandler()
  }, [isCateSuccess])
  



  return (
        <Tabs
        size="sm"
        aria-label="Pricing plan"
        defaultValue={0}
        sx={(theme) => ({
          width: "97%",
          minHeight: "88vh",
          marginTop: "30px",
          position: "sticky",
          top: "0",
          '--Tabs-gap': '0px',
          borderRadius: 'lg',
          boxShadow: 'sm',
          overflow: 'auto',
          border: `1px solid ${theme.vars.palette.divider}`,
        })}
      >
        <TabList
          sx={{
            '--ListItem-radius': '0px',
            borderRadius: 0,
            [`& .${tabClasses.root}`]: {
              fontWeight: 'lg',
              flex: 1,
              bgcolor: 'background.body',
              position: 'relative',
              [`&.${tabClasses.selected}`]: {
                color: 'primary.500',
              },
              [`&.${tabClasses.selected}:before`]: {
                content: '""',
                display: 'block',
                position: 'absolute',
                bottom: -1,
                width: '100%',
                height: 2,
                bgcolor: 'primary.400',
              },
              [`&.${tabClasses.focusVisible}`]: {
                outlineOffset: '-3px',
              },
            },
          }}
        >
          <Tab sx={{ py: 1.5 }} ><p className='poppinsBold'>Create Product</p></Tab>
          <Tab><p className='poppinsBold'>Manage Product</p></Tab>
        </TabList>
        <TabPanel value={0} sx={{ p: 3 }}>
          <div>   
            <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Product name</Label>
              <Input type="text" name="productName"  id="exampleEmail" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="exampleSelect">Product Category</Label>
              <Input type="select" name="productCategory" id="exampleSelect" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
                {getAllCategories && getAllCategories.map((data, index) => (
                  <option value={data._id} key={index}>{data.categoryName}</option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Price</Label>
              <Input type="number" name="productPrice" id="exampleText"   value={price} onChange={(e) => setPrice(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Discount</Label>
              <Input type="number" name="productDisPrice" id="exampleText"   value={discount} onChange={(e) => setDiscount(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Product description</Label>
              <Input type="textarea" name="productDescription" id="exampleText"   value={productDes} onChange={(e) => setProductDes(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Product Ingredients</Label>
              <Input type="textarea" name="productIngredients" id="exampleText"   value={productIngredients} onChange={(e) => setProductIngredients(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Product Details</Label>
              <Input type="textarea" name="productDetails" id="exampleText"   value={productDetails} onChange={(e) => setProductDetails(e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">nos in stock</Label>
              <Input type="number" name="productStock" id="exampleText"  value={stock} onChange={(e) => setStock(e.target.value)} />
            </FormGroup>
            {loadingHere()}
            <FormGroup>
              <Label for="exampleText">images</Label>
              <Input className="form-control form-control-lg" id="formFileLg" type="file" onChange={onFileInputChange} />
              <button type="button" class="btn btn-primary" onClick={(e) => submitImage(e)}>Upload</button>
            </FormGroup>
           
              {/* Image previews */}
              <div>
                <h3>Image Previews:</h3>
                {fileUploadURL.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Image ${index + 1}`}
                    width="100"
                    height="100"
                  />
                ))}
              </div>
            <FormGroup>
              <Label for="exampleText">How to use</Label>
              <Input type="textarea" name="productHowTo" id="exampleText"  value={usage} onChange={(e) => setUsage(e.target.value)} />
            </FormGroup> 
            <FormGroup>
              <Label for="exampleText">benifits and skin types</Label>
              <Input type="textarea" name="productbeinfitSkinType" id="exampleText"  value={benifits} onChange={(e) => setBenifits(e.target.value)} />
            </FormGroup> 
            <FormGroup check>
              <Label check>
                <Input type="checkbox"  />{' '}
                checked above provided details
              </Label>
            </FormGroup>
            <Button onClick={(e) => handleSubmit(e)} style={{backgroundColor: "#4FB23A", border: "none", padding: "8px 40px", marginTop: "20px"}} type='submit'>Submit</Button>
          </Form>
        </div>
        </TabPanel>
        <TabPanel value={1} sx={{ p: 3 }}>

        <TableContainer component={Paper} style={{marginTop: "50px"}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell> Name</TableCell>
                      <TableCell > images</TableCell>
                      <TableCell >category </TableCell>
                      <TableCell >price </TableCell>
                      <TableCell >discount </TableCell>
                      <TableCell >description </TableCell>
                      <TableCell >ingredients </TableCell>
                      <TableCell >details </TableCell>
                      <TableCell >stock </TableCell>
                      <TableCell >usage </TableCell>
                      <TableCell >benifits </TableCell>
                      
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {getAllProducts && getAllProducts.map((data, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {data.productName}
                        </TableCell>
                        <TableCell >
                        <div className="productimg-manage-grid">
                          {data.images.map((imageUrl, index) => (
                            <div key={index} >
                              <img src={imageUrl} className="productimg-manage" alt={`Image ${index + 1}`} />
                            </div>
                          ))}
                        </div>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.productCategory}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.price}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.discount}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.productDes}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.productIngredients}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.productDetails}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.stock}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.usage}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {data.benifits}
                        </TableCell>
                        <Button>
                          Edit
                        </Button>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            {/* <div className='cards-grid'>
              {productTable.map((data, index) => {
                  <Card className="card-p" variant="outlined" sx={{ width: "auto" }} key={index} >
                  <Typography level="body3">Product name</Typography>
                  
                      

                  </Card>
              })}
                </div> */}
        </TabPanel>
        </Tabs>
    
  )
}

export default Products


