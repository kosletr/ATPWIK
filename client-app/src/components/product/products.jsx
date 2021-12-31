import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../utils/sidebar";
import ListCards from "../utils/listCards";
import SearchBar from "../utils/searchBar";
import Pagination from "../utils/pagination";
import { paginate } from "../utils/paginate";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import authService from "../../services/authService";
import {
  getLikedProductIds,
  addLikeToProduct,
  removeLikeFromProduct,
  getRatedProductIds,
  addRatingToProduct,
  removeRatingFromProduct,
} from "../../services/userService";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const history = useHistory();

  useEffect(() => {
    (async function () {
      let { data: receivedCategories } = await getCategories();
      receivedCategories = [{ _id: "", name: "All Categories" }, ...receivedCategories];
      const { data: receivedProducts } = await getProducts();

      if (authService.getCurrentUser() != null) {
        // Get User's Likes
        const { data: likedProductIds } = await getLikedProductIds();

        receivedProducts.forEach((p) => {
          p.liked = likedProductIds.includes(p._id);
        });

        // Get User's Ratings
        const { data: ratings } = await getRatedProductIds();

        ratings.forEach((r) => {
          let p_index = receivedProducts.findIndex((p) => p._id === r.productId);
          if (p_index >= 0) receivedProducts[p_index].rating = r.rating;
        });
      }
      setCategories(receivedCategories);
      setProducts(receivedProducts);
    }());
  }, []);



  async function handleLike({ currentTarget: input }) {
    if (authService.getCurrentUser() == null) {
      history.push("/login");
      return;
    }

    const prods = [...products];
    const productId = input.id;
    const index = prods.findIndex((p) => p._id === productId);
    prods[index] = { ...prods[index] };
    prods[index].liked = !prods[index].liked;
    setProducts(prods);

    await (!products[index].liked)
      ? addLikeToProduct(productId)
      : removeLikeFromProduct(productId);
  };

  /* Rating Component */

  async function handleSaveRating(rating, productId) {
    if (authService.getCurrentUser() == null) {
      history.push("/login");
      return;
    }

    const prods = [...products]
    const index = prods.findIndex((p) => p._id === productId);
    prods[index] = { ...prods[index] };

    prods[index].rating = rating;
    setProducts(prods);

    await addRatingToProduct(productId, rating);
  };

  async function handleRemoveRating(productId) {
    if (authService.getCurrentUser() == null) {
      history.push("/login");
      return;
    }

    const prods = [...products]
    const index = prods.findIndex((p) => p._id === productId);
    prods[index] = { ...prods[index] };

    prods[index].rating = 0;
    setProducts(prods);

    await removeRatingFromProduct(productId);
  };

  /* Pagination Component */

  function handlePageChange(page) {
    setCurrentPage(page);
  };

  function handleCategorySelect(category) {
    setSelectedCategory(category);
    setSearchQuery("");
    setCurrentPage(1);
  };

  function handleSearch(query) {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  function getPagedData() {
    const allProducts = products;

    let searchList = [];
    let filtered = allProducts;
    if (selectedCategory && selectedCategory._id)
      filtered = allProducts.filter(m => m.category._id === selectedCategory._id);

    if (searchQuery) {
      filtered = filtered.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
      searchList = filtered.slice(0, 5);
    }

    return {
      totalCount: filtered.length,
      data: paginate(filtered, currentPage, pageSize),
      searchList
    };
  };


  if (products.length === 0)
    return <div style={{ padding: "2rem" }}><p>There are no products in the database.</p></div>;

  const { totalCount, data: pageProducts, searchList } = getPagedData();
  return (
    <>
      <div className="sidebar">
        <Sidebar
          items={categories}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="products-page">
        <div className="my-container">
          <h3>Products</h3>
        </div>
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          items={searchList}
        />
        <div className="products-area">
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <div className="my-container">
            <ListCards
              data={pageProducts}
              cardDetails={["_id", "title", "price", "shortDesc", "imageURL", "liked", "rating", "owner"]}
              extraProps={{
                onLike: handleLike,
                onSaveRating: handleSaveRating,
                onRemoveRating: handleRemoveRating,
              }}
            />
          </div>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

        </div>
      </div>
    </>
  );
}
