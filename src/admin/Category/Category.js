import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';


let categorySchema = object({
    category: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'Use a valid name').max(15, 'Use a valid name'),
    description: string().required().min(5, "Must be 5 characters or more").max(50, "Must be 50 characters or less"),
});

const Category = () => {
    const formik = useFormik({
        initialValues: {
            category: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    + Category
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: handleSubmit,
                    }}
                >
                    <DialogTitle>Add Category</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="category"
                            name="category"
                            label="Enter Category Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.category}
                        />
                        <span className='text-danger'>{errors.category && touched.category ? errors.category : ''} </span>
                    </DialogContent>
                    <DialogTitle>Add Category Description</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            label="Enter Category Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                        />
                        <span className='text-danger'>{errors.description && touched.description ? errors.description : ''} </span>
                    </DialogContent>


                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}

export default Category
