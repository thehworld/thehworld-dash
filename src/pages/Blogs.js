import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import MultiImageInput from "react-multiple-image-input";
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import EasyEdit, { Types } from "react-easy-edit";
import { Save } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import { createBlog } from '../api/Api';

export default function Blogs() {

  const [isSuccess, setIsSuccess] = useState(false);

  const [blogCategory, setBlogCategory] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [subContentTitle, setSubContentTitle] = useState("");
  const [subContentDes, setSubContentDes] = useState("");
  const [subContentArray, setsubContentArray] = useState([]);
  const [images, setImages] = useState({});

  const [blogTable, setBlogTable] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    createBlog({
      blogsCategory: blogCategory,
      blogTitle: blogTitle,
      blogDescription: blogContent,
      subContentArray: subContentArray,
      blogImages: images
    })
    .then((res) => {
      if(res) {
        setIsSuccess(true)
      }
      setBlogCategory("")
      setBlogTitle("")
      setBlogContent("")
      setsubContentArray([])
      setImages({})

      console.log("blog created -", res)
    })
    .catch((err) => {
      console.log("error creating blog -", err)
    })
  }

  
  //sub content


  const addSubContent = (e) => {
    e.preventDefault()
    let tempSubContentArray = [...subContentArray]
    const subContentObject = {
      title: subContentTitle,
      description: subContentDes,
      id: uuidv4()
    }
    console.log("object - ", subContentObject)
    console.log("list - ", tempSubContentArray)
    tempSubContentArray.push(subContentObject)
    setsubContentArray(tempSubContentArray)
  }


  const deleteSubContent = (e, id) => {
    e.preventDefault();
    let tempSubContentArray = [...subContentArray];
    let tempSub = tempSubContentArray.find(sub => sub.id === id);
    let tempSubIndex = tempSubContentArray.findIndex(sub => sub.id === id);
    console.log("tempSub - ", tempSub, tempSubIndex)
    tempSubContentArray.splice(tempSubIndex,1);
    setsubContentArray(tempSubContentArray);
  }


  
  const crop = {
    unit: "%",
    aspect: 4 / 3,
    width: "100"
  };




  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
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
        <Tab><p className='poppinsBold' style={{marginTop: "10px"}}>Create Blogs</p></Tab>
        <Tab><p className='poppinsBold' style={{marginTop: "10px"}}>Edit Blogs</p></Tab>
      </TabList>
      <TabPanel value={0} sx={{ p: 3 }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Blog Title</Label>
          <Input type="text" name="blogName" id="exampleEmail" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Blog Main Content</Label>
          <Input type="textarea" name="text" id="exampleText" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} />
        </FormGroup>
        <div className='form-card'>
          <FormGroup>
            <Label for="exampleEmail">Blog sub-heading</Label>
            <Input type="text" name="email" value={subContentTitle} onChange={(e) => setSubContentTitle(e.target.value)}  id="exampleEmail" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Blog sub-content</Label>
            <Input type="textarea" name="text"  value={subContentDes} onChange={(e) => setSubContentDes(e.target.value)} id="exampleText" />
          </FormGroup>
          <Button color='primary' onClick={(e) => addSubContent(e)}>add sub heading and content</Button>
          {subContentArray.map((cont) => {
            return(
              <div style={{padding: "5px", border: "1px solid #131313", borderRadius: "5px", marginTop: "20px"}}>
              <p className='poppinsRegular'><span className='poppinsBold'>Sub Heading - </span>{cont.title}</p>
              <p className='poppinsRegular'><span className='poppinsBold'>Sub Content - </span>{cont.description}</p>
              <Button color='danger' style={{marginLeft: "15px"}} onClick={(e) => deleteSubContent(e, cont.id)}>delete</Button>
              
              </div>
            )
          })}
        </div>
        <br />
        <Label for="exampleEmail">Blog Images</Label>
        <MultiImageInput
          images={images}
          setImages={setImages}
          allowCrop={true}
          theme={"light"}
          max={4}
          cropConfig={{ crop, ruleOfThirds: true }}
        /> 
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            confirm to upload
          </Label>
        </FormGroup>
        <Button style={{backgroundColor: "#4FB23A", border: "none", padding: "8px 40px", marginTop: "20px"}} type='submit'>Submit</Button>
      </Form>
      </TabPanel>
      <TabPanel value={1} sx={{ p: 3 }}>
        <div className='cards-grid'>
            <Card className="card-p" variant="outlined" sx={{ width: "auto" }}>
            <Typography level="body3">Product name</Typography>
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                <EasyEdit
                    type={Types.TEXT}
                    value="Product name"
                    onSave={val => console.log(val)}
                    allowEdit={true}
                />
            </Typography>
            <Typography level="body3">Product category</Typography>
            <Typography level="body2">
                <EasyEdit
                type="select"
                options={[
                    {label: 'First option', value: 'one'},
                    {label: 'Second option', value: 'two'}]}
                placeholder="My Placeholder"
                instructions="Custom instructions"
                onSave={val => console.log(val)}
                />
            </Typography>
            <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
            >
                <Save />
            </IconButton>
                <MultiImageInput
                  images={images}
                  setImages={setImages}
                  allowCrop={true}
                  theme={"light"}
                  max={4}
                  cropConfig={{ crop, ruleOfThirds: true }}
                />              
            <Box sx={{ display: 'flex' }}>
                <div>
                <Typography level="body3">Description</Typography>
                <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                    <EasyEdit
                        type={Types.TEXT}
                        value="this is a product by the h world"
                        onSave={val => console.log(val)}
                        allowEdit={true}
                    />
                </Typography>
                <Typography level="body3">Ingredient</Typography>
                <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                    <EasyEdit
                        type={Types.TEXT}
                        value="Product name"
                        onSave={val => console.log(val)}
                        allowEdit={true}
                    />
                </Typography>
                <Typography level="body3">Total price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                <EasyEdit
                    type={Types.NUMBER}
                    value="5000"
                    onSave={val => console.log(val)}
                    allowEdit={true}
                />
                </Typography>
                <Typography level="body3">Discount price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                <EasyEdit
                    type={Types.NUMBER}
                    value="5000"
                    onSave={val => console.log(val)}
                    allowEdit={true}
                />
                </Typography>
                </div>
                {/* <Button
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: 'auto', fontWeight: 600 }}
                >
                Explore
                </Button> */}
            </Box>
            </Card>
           
            </div>
      </TabPanel>
    </Tabs>
            
    </div>
  );
}