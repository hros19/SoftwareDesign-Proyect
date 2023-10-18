import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from "react";
import React from 'react';
import "./css/Filters.css";
import Button from './components/Buttons';
import "./css/Products.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Button1 from "./Boton";
import Footer from './components/Footer';
import makeUpService from './services/makeUpService';
import categoryService from './services/categoryService';
import subCategoryService from './services/subCategoryService';
import "./css/index.css";


function App() {
  const [categories, setCategories] = useState({});

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  const [subCategories, setSubCategories] = useState({});

  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('');

  const [associatedSubCategories, setAssociatedSubCategories] = useState([]);

  const [products, setproducts] = useState({});

  const fetchproducts = async()=>{
    setproducts(await makeUpService.getMakeUps());
  };

  useEffect(()=>{
    fetchproducts();
  },[products]);

  const fetchCategories = async()=>{
    setCategories(await categoryService.getCategories());
};

useEffect(()=>{
    fetchCategories();
},[categories]);

  return (
    <>
      <Navbar/>
      <h1 className="title-container">Administrar Galería</h1>
      <h2>Haz click en una imagen para administrarla ó              <Button
        onClickHandler={() => {
          window.location.href = '../AddPicture';
        }}
        value="some-value"
        title="Agregar Imagen"
      /></h2>
    
      <section className="filters">
        <div className="ml">
          <select
              value={selectedCategory}
              onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  const selectedCategoryObject = categories.data.data.find(category => category._id === e.target.value);
                  if (selectedCategoryObject) {
                      setSelectedCategoryName(selectedCategoryObject.nameCategory);
                      setAssociatedSubCategories(selectedCategoryObject.subCategories);
                  } else {
                      setSelectedCategoryName('');
                      setAssociatedSubCategories([]);
                      setSelectedSubCategoryName('');
                  }
              }}
          >
              <option key="" value="">Categoría</option>
              {categories.data !== undefined && categories.data.data.length > 0 && (
                  categories.data.data.map((category) => (
                      <option key={category._id} value={category._id}>
                          {category.nameCategory}
                      </option>
                  ))
              )}
          </select>
        </div>
        <div className="ml">
        <select
                        value={selectedSubCategory}
                        onChange={(e) => {
                            setSelectedSubCategory(e.target.value);
                            const selectedSubCategoryObject = associatedSubCategories.find(subCategory => subCategory._id === e.target.value);
                            if (selectedSubCategoryObject) {
                                setSelectedSubCategoryName(selectedSubCategoryObject.nameSubCategory);
                            } else {
                                setSelectedSubCategoryName('');
                            }
                        }}
                    >
                        <option key="" value="">Sub Categoría</option>
                        {associatedSubCategories.map((subCategory) => (
                            <option key={subCategory._id} value={subCategory._id}>
                                {subCategory.nameSubCategory}
                            </option>
                        ))}
                    </select>
        </div>
        <div className="ml">
        </div>
        <input
          className="search-input"
          type="text"
          placeholder="Buscar"
        />
      </section>
      <section className="card-container">
        {products.data !== undefined && products.data.data.length > 0 && (
                      products.data.data.map((product) => (
                          <Card
                            key={product._id}
                            img={'http://localhost:8000/api/makeUp/makeUpImages/'+product.image}
                            title={product.titleMakeUp}
                            category={product.categoryMakeUp}
                            subCategory={product.subCategoriesMakeUp.map((subCategory) => subCategory.nameSubCategory).join(', ')}
                            date={product.date}
                            description={product.description}
                            keyWords={product.keyWords.map((keyWord) => keyWord.nameKeyWord).join(', ')}
                            tags={"#"+product.tags.map((tag) => tag.nameTag).join(' #')}
                          />
                      ))          
        )}
      </section>
      <Footer />
    </>
  );
}

export default App;