import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const Category = () => {
    const [shoes, setShoes] = useState([])
    const [category, setCategory] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [sorting, setsorting] = useState('')
    const [brandName, setBrandName] = useState([]);
    const [brandSort, setBrandSort] = useState('');
    const [colorList, setColorList] = useState([]);
    const [selectedColor, setSelectedColor] = useState('');

    const shoesData = async () => {
        const res = await fetch('http://localhost:8000/shoes')
        const data = await res.json()

        let uniqueCategory = [...new Set(data.map(item => item.category))]

        let shoeNames = [...new Set(data.map(item => item.name))];

        let uniqueColors = [...new Set(data.map(item => item.color))];

        setColorList(uniqueColors);
        setBrandName(shoeNames);
        setCategory(uniqueCategory)
        setShoes(data)
    }

    useEffect(() => {
        shoesData();
    }, []);

    const handleSortBy = (selectedCategory) => {
        setSortBy(selectedCategory);
    };

    const handleBrandChange = (selectedBrand) => {
        setBrandSort(selectedBrand);
    }

    const handleColorChange = (selectedColor) => {
        setSelectedColor(selectedColor);
    }

    const handleSortingChange = (e) => {
        setsorting(e.target.value);
    };

    const handleAllData = () => {
        let filteredData = {}

        if (sortBy) {
            filteredData = shoes.filter((item) => item.category === sortBy);
        } else {
            filteredData = shoes;
        }

        if (brandSort) {
            filteredData = filteredData.filter((item) => item.name === brandSort);
        }

        if (selectedColor) {
            filteredData = filteredData.filter((item) => item.color === selectedColor);
        }

        if (sorting === "atoz") {
            filteredData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sorting === "ztoa") {
            filteredData = filteredData.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sorting === "lowtohigh") {
            filteredData = filteredData.sort((a, b) => a.orgPrice - b.orgPrice);
        } else if (sorting === "hightolow") {
            filteredData = filteredData.sort((a, b) => b.orgPrice - a.orgPrice);
        } else {
            filteredData = filteredData;
        }

        return filteredData
    }

    const finalData = handleAllData();

    let { id } = useParams();

    return (
        <>
            <div>
                {/* Start Banner Area */}
                <section className="banner-area organic-breadcrumb">
                    <div className="container">
                        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
                            <div className="col-first">
                                <h1>Shop Category page</h1>
                                <nav className="d-flex align-items-center">
                                    <a href="index.html">Home<span className="lnr lnr-arrow-right" /></a>
                                    <a href="#">Shop<span className="lnr lnr-arrow-right" /></a>
                                    <a href="category.html">Fashon Category</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End Banner Area */}
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-md-5">
                            <div className="sidebar-categories">
                                <div className="head">Browse Categories</div>
                                <ul className="main-categories">
                                    {category.map((item, index) => (
                                        <li key={index} className="main-nav-list">
                                            <a data-toggle="collapse" href="#fruitsVegetable" aria-expanded="false" aria-controls="fruitsVegetable" onClick={() => handleSortBy(item)}>
                                                <span className="lnr lnr-arrow-right" />
                                                {item}
                                                <span className="number">
                                                    {shoes.length > 0 ? shoes.filter(shoe => shoe.category === item).length : 0}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="sidebar-filter mt-50">
                                <div className="top-filter-head">Product Filters</div>
                                <div className="common-filter">
                                    <div className="head">Brands</div>
                                    <form action="#">
                                        <ul>
                                            {/* find brand name */}
                                            {brandName.map((item, index) => (
                                                <li className="filter-list" key={index} onClick={() => handleBrandChange(item)}>
                                                    <input className="pixel-radio" type="radio" id={item} name="brand" />
                                                    <label htmlFor={item}>{item}</label>
                                                </li>
                                            ))}
                                            {/* <li className="filter-list"><input className="pixel-radio" type="radio" id="apple" name="brand" /><label htmlFor="apple">Apple<span>(29)</span></label></li> */}
                                        </ul>
                                    </form>
                                </div>
                                <div className="common-filter">
                                    <div className="head">Color</div>
                                    <form action="#">
                                        <ul>
                                            {colorList.map((color, index) => (
                                                <li className="filter-list" key={index} onClick={() => handleColorChange(color)}>
                                                    <input className="pixel-radio" type="radio" id={color} name="color" />
                                                    <label htmlFor={color}>{color}</label>
                                                </li>
                                            ))}
                                        </ul>
                                    </form>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-7">
                            {/* Start Filter Bar */}
                            <div className="filter-bar d-flex flex-wrap align-items-center">
                                <div className="sorting mr-auto">
                                    <select onChange={handleSortingChange} value={sorting}>
                                        <option value=''>- Sort Data -</option>
                                        <option value='atoz'>A to Z</option>
                                        <option value='ztoa'>Z to A</option>
                                        <option value='lowtohigh'>Price : Low to High</option>
                                        <option value='hightolow'>Price : High to Low</option>
                                    </select>
                                </div>
                            </div>
                            {/* End Filter Bar */}
                            {/* Start Best Seller */}
                            <section className="lattest-product-area pb-40 category-list">
                                <div className="row">
                                    {/* single product */}
                                    {finalData.map((shoe, index) => (
                                        <div key={index} className="col-lg-4 col-md-6 mb-4">
                                            <Link to={`/category/${shoe.id}`}>
                                                <div className="single-product">
                                                    <img className="img-fluid" src={shoe.image} alt={shoe.name} />
                                                    <div className="product-details">
                                                        <h6>{shoe.name}</h6>
                                                        <div className="price">
                                                            <h6>${shoe.orgPrice}.00</h6>
                                                            <h6 className="l-through">${shoe.price}.00</h6>
                                                        </div>
                                                        <div className="prd-bottom">
                                                            <a href="#" className="social-info">
                                                                <span className="ti-bag" />
                                                                <p className="hover-text">add to bag</p>
                                                            </a>
                                                            <a href="#" className="social-info">
                                                                <span className="lnr lnr-heart" />
                                                                <p className="hover-text">Wishlist</p>
                                                            </a>
                                                            <a href="#" className="social-info">
                                                                <span className="lnr lnr-sync" />
                                                                <p className="hover-text">compare</p>
                                                            </a>
                                                            <a href="#" className="social-info">
                                                                <span className="lnr lnr-move" />
                                                                <p className="hover-text">view more</p>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                    {/* single product */}
                                </div>
                            </section>

                            {/* End Best Seller */}
                            {/* Start Filter Bar */}
                            <div className="filter-bar d-flex flex-wrap align-items-center">
                                <div className="pagination">
                                    <a href="#" className="prev-arrow"><i className="fa fa-long-arrow-left" aria-hidden="true" /></a>
                                    <a href="#" className="active">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                    <a href="#" className="dot-dot"><i className="fa fa-ellipsis-h" aria-hidden="true" /></a>
                                    <a href="#">6</a>
                                    <a href="#" className="next-arrow"><i className="fa fa-long-arrow-right" aria-hidden="true" /></a>
                                </div>
                            </div>
                            {/* End Filter Bar */}
                        </div>
                    </div>
                </div>
                {/* Start related-product Area */}
                <section className="related-product-area section_gap">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 text-center">
                                <div className="section-title">
                                    <h1>Deals of the Week</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                                        <div className="single-related-product d-flex">
                                            <a href="#"><img src="img/r1.jpg" alt /></a>
                                            <div className="desc">
                                                <a href="#" className="title">Black lace Heels</a>
                                                <div className="price">
                                                    <h6>$189.00</h6>
                                                    <h6 className="l-through">$210.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                                        <div className="single-related-product d-flex">
                                            <a href="#"><img src="img/r2.jpg" alt /></a>
                                            <div className="desc">
                                                <a href="#" className="title">Black lace Heels</a>
                                                <div className="price">
                                                    <h6>$189.00</h6>
                                                    <h6 className="l-through">$210.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                                        <div className="single-related-product d-flex">
                                            <a href="#"><img src="img/r3.jpg" alt /></a>
                                            <div className="desc">
                                                <a href="#" className="title">Black lace Heels</a>
                                                <div className="price">
                                                    <h6>$189.00</h6>
                                                    <h6 className="l-through">$210.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                                        <div className="single-related-product d-flex">
                                            <a href="#"><img src="img/r5.jpg" alt /></a>
                                            <div className="desc">
                                                <a href="#" className="title">Black lace Heels</a>
                                                <div className="price">
                                                    <h6>$189.00</h6>
                                                    <h6 className="l-through">$210.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                                        <div className="single-related-product d-flex">
                                            <a href="#"><img src="img/r6.jpg" alt /></a>
                                            <div className="desc">
                                                <a href="#" className="title">Black lace Heels</a>
                                                <div className="price">
                                                    <h6>$189.00</h6>
                                                    <h6 className="l-through">$210.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6 mb-20">
                                        <div className="single-related-product d-flex">
                                            <a href="#"><img src="img/r7.jpg" alt /></a>
                                            <div className="desc">
                                                <a href="#" className="title">Black lace Heels</a>
                                                <div className="price">
                                                    <h6>$189.00</h6>
                                                    <h6 className="l-through">$210.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="single-related-product d-flex">
                                            <a href="#"><img src="img/r9.jpg" alt /></a>
                                            <div className="desc">
                                                <a href="#" className="title">Black lace Heels</a>
                                                <div className="price">
                                                    <h6>$189.00</h6>
                                                    <h6 className="l-through">$210.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="single-related-product d-flex">
                                            <a href="#"><img src="img/r10.jpg" alt /></a>
                                            <div className="desc">
                                                <a href="#" className="title">Black lace Heels</a>
                                                <div className="price">
                                                    <h6>$189.00</h6>
                                                    <h6 className="l-through">$210.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-6">
                                        <div className="single-related-product d-flex">
                                            <a href="#"><img src="img/r11.jpg" alt /></a>
                                            <div className="desc">
                                                <a href="#" className="title">Black lace Heels</a>
                                                <div className="price">
                                                    <h6>$189.00</h6>
                                                    <h6 className="l-through">$210.00</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="ctg-right">
                                    <a href="#" target="_blank">
                                        <img className="img-fluid d-block mx-auto" src="img/category/c5.jpg" alt />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* End related-product Area */}
            </div>
        </>
    )
}

export default Category
