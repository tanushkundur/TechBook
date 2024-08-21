import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductCard } from "../../components";
import { FilterBar } from "./components/FilterBar";
import axios from 'axios';
import { useFilter } from "../../context/FilterContext";

export const ProductList = () => {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 5; 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("name");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`http://localhost:8000/products?name=${searchTerm ? searchTerm : ""}`);
        setProducts(response.data);
        setTotalProducts(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [searchTerm]);

  // Calculate the products to display on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <main>
      <section className="my-5">
        <div className="my-5 flex justify-between">
          <span className="text-2xl font-semibold dark:text-slate-100 mb-5">Explore eBooks ({totalProducts})</span>
          <span>
            <button onClick={() => setShow(!show)} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700" type="button"> 
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
            </button>
          </span>            
        </div>    

        <div className="flex flex-wrap justify-center lg:flex-row">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>  

        <div className="flex justify-center mt-4">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg ml-2"
          >
            Next
          </button>
        </div>
        
      </section>
      
      {show && <FilterBar setShow={setShow} />}
    </main> 
  );
};