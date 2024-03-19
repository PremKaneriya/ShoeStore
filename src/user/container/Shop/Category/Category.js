import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const Category = () => {
    const [shoes, setShoes] = useState([])
    const [category, setCategory] = useState([])
    const [sortBy, setSortBy] = useState('')

    const shoesData = async () => {
        const res = await fetch('http://localhost:8000/shoes')
        const data = await res.json()

        let uniqueCategory = [...new Set(data.map(item => item.category))]

        setCategory(uniqueCategory)
        setShoes(data)
    }

    useEffect(() => {
        shoesData();
    }, []);

    const handleSortBy = (selectedCategory) => {
        setSortBy(selectedCategory);
    };

    const finalData = sortBy ? shoes.filter(item => item.category === sortBy) : shoes;

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
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="apple" name="brand" /><label htmlFor="apple">Apple<span>(29)</span></label></li>
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="asus" name="brand" /><label htmlFor="asus">Asus<span>(29)</span></label></li>
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="gionee" name="brand" /><label htmlFor="gionee">Gionee<span>(19)</span></label></li>
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="micromax" name="brand" /><label htmlFor="micromax">Micromax<span>(19)</span></label></li>
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="samsung" name="brand" /><label htmlFor="samsung">Samsung<span>(19)</span></label></li>
                                        </ul>
                                    </form>
                                </div>
                                <div className="common-filter">
                                    <div className="head">Color</div>
                                    <form action="#">
                                        <ul>
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="black" name="color" /><label htmlFor="black">Black<span>(29)</span></label></li>
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="balckleather" name="color" /><label htmlFor="balckleather">Black
                                                Leather<span>(29)</span></label></li>
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="blackred" name="color" /><label htmlFor="blackred">Black
                                                with red<span>(19)</span></label></li>
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="gold" name="color" /><label htmlFor="gold">Gold<span>(19)</span></label></li>
                                            <li className="filter-list"><input className="pixel-radio" type="radio" id="spacegrey" name="color" /><label htmlFor="spacegrey">Spacegrey<span>(19)</span></label></li>
                                        </ul>
                                    </form>
                                </div>
                                <div className="common-filter">
                                    <div className="head">Price</div>
                                    <div className="price-range-area">
                                        <div id="price-range" />
                                        <div className="value-wrapper d-flex">
                                            <div className="price">Price:</div>
                                            <span>$</span>
                                            <div id="lower-value" />
                                            <div className="to">to</div>
                                            <span>$</span>
                                            <div id="upper-value" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8 col-md-7">
                            {/* Start Filter Bar */}
                            <div className="filter-bar d-flex flex-wrap align-items-center">
                                <div className="sorting">
                                    <select>
                                        <option value={1}>Default sorting</option>
                                        <option value={1}>Default sorting</option>
                                        <option value={1}>Default sorting</option>
                                    </select>
                                </div>
                                <div className="sorting mr-auto">
                                    <select>
                                        <option value={1}>Show 12</option>
                                        <option value={1}>Show 12</option>
                                        <option value={1}>Show 12</option>
                                    </select>
                                </div>
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
                                <div className="sorting mr-auto">
                                    <select>
                                        <option value={1}>Show 12</option>
                                        <option value={1}>Show 12</option>
                                        <option value={1}>Show 12</option>
                                    </select>
                                </div>
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
