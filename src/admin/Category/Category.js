import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';


let categorySchema = object({
    category: string().required().matches(/^[a-zA-Z'-\s]*$/, 'Invalid name').min(2, 'Use a valid name').max(15, 'Use a valid name'),
    description: string().required().min(5, "Must be 5 characters or more").max(50, "Must be 50 characters or less"),
});

const Category = () => {
    const handleAddData = (data) => {

        let localData = JSON.parse(localStorage.getItem('categories'))

        const rNo = Math.floor(Math.random() * 1000)

        if (localStorage) {
            localData.push({ ...data, id: rNo })
            localStorage.setItem('categories', JSON.stringify(localData));
        } else {
            localStorage.setItem('categories', JSON.stringify({ ...data, id: rNo }))
        }

        getData()

    }

    const formik = useFormik({
        initialValues: {
            category: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: values => {
            handleAddData(values)
            formik.resetForm()
            handleClose()
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik

    const [open, setOpen] = React.useState(false);
    const [rowData, setRowData] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getData = () => {
        let localData = JSON.parse(localStorage.getItem('categories'))

        if (localData) {
            setRowData(localData)
        }

    }

    useEffect(() => {
        getData()
    })

    const columns = [
        { field: 'category', headerName: 'Category', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'remove',
            headerName: 'Remove',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemove(params.row.id)}
                >
                    Remove
                </Button>
            ),
        }
    ]

    const handleRemove = (id) => {
        let updateData = rowData.filter((item) => item.id !== id)
        localStorage.setItem('categories', JSON.stringify(updateData))
        setRowData(updateData)
    }

    return (
        <>
            <h1>Admin Category</h1>
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
                            helperText={errors.category && touched.category ? errors.category : ' '}
                            error={errors.category && touched.category}
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
                    </DialogContent>
                    <DialogTitle>Add Category Description</DialogTitle>
                    <DialogContent>
                        <TextField
                            helperText={errors.description && touched.description ? errors.description : ' '}
                            error={errors.description && touched.description}
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
                    </DialogContent>


                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>




            <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
                <DataGrid
                    rows={rowData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

        </>
    )
}

export default Category
