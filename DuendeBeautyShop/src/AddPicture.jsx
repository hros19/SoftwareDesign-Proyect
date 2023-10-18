import Navbar from "./components/Navbar";
import "./css/index.css";
import Button from './components/Buttons';
import Footer from './components/Footer';
import React, { useState, useEffect } from "react";
import categoryService from './services/categoryService';
import subCategoryService from './services/subCategoryService';
import makeUpService from './services/makeUpService';

function App() {


    const [categories, setCategories] = useState({});

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const [subCategories, setSubCategories] = useState({});

    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('');

    const [associatedSubCategories, setAssociatedSubCategories] = useState([]);

    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    const [image,setImage] = useState('');

    const [titleMakeUp, setTitleMakeUp] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('titleMakeUp', titleMakeUp);
        formData.append('categoryMakeUp', selectedCategoryName);
        selectedSubCategories.forEach((subCategoryName, index)  => {
            formData.append(`subCategoriesMakeUp[${index}][nameSubCategory]`, subCategoryName);
        });

        const currentDate = new Date(); // Obtiene la fecha actual

        const day = currentDate.getDate().toString().padStart(2, '0'); // Día con cero a la izquierda si es necesario
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Mes (agregar 1 ya que los meses se cuentan desde 0)
        const year = currentDate.getFullYear();
        
        const formattedDate = `${day}/${month}/${year}`;
        formData.append('date', formattedDate);
        formData.append('image',image);
        formData.append('description',description);
          
        keyWords.forEach((keyWord, index) => {
            formData.append(`keyWords[${index}][nameKeyWord]`, keyWord);
        });

        tags.forEach((tag, index) => {
            formData.append(`tags[${index}][nameTag]`, tag);
        });
        try {
          const response = await makeUpService.create(formData);
          if (response.data.success) {
            console.log('Post created successfully.');
          } else {
            console.log('Post Failed!');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
        
      };

      const handleSelected = () => {
        if (selectedSubCategory) {
          // Check if the value is not already in the array before adding it
          if (!selectedSubCategories.includes(selectedSubCategoryName)) {
            setSelectedSubCategories([...selectedSubCategories, selectedSubCategoryName]);
            console.log(selectedSubCategories);
          }
          setSelectedSubCategory('');
        }
      };
      
      
      const handleDeleteSelected = () => {
        const updatedSubCategories = selectedSubCategories.filter((subCategory) => subCategory !== selectedSubCategoryName);
        
        setSelectedSubCategories(updatedSubCategories);
      };

    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0])
    };

    const fetchCategories = async()=>{
        setCategories(await categoryService.getCategories());
    };

    useEffect(()=>{
        fetchCategories();
    },[categories]);


    const fetchSubCategories = async()=>{
        setSubCategories(await subCategoryService.getSubCategories());
    };

    useEffect(()=>{
        fetchSubCategories();
    },[subCategories]);
    
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    const handleTagInput = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
  
        const newTag = inputValue.trim();
        if (newTag) {
          setTags([...tags, newTag]);
          setInputValue('');
        }
      }
    };
  
    const handleRemoveTag = (tagToRemove) => {
      const updatedTags = tags.filter((tag) => tag !== tagToRemove);
      setTags(updatedTags);
    };


    const [keyWords, setKeyWords] = useState([]);
    const [inputKeyWordValue, setInputKeyWordValue] = useState('');
  
    const handleKeyWordInput = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
  
        const newKeyWord = inputKeyWordValue.trim();
        if (newKeyWord) {
            setKeyWords([...keyWords, newKeyWord]);
            setInputKeyWordValue('');
        }
      }
    };
  
    const handleRemoveKeyWord = (keyWordToRemove) => {
      const updatedKeyWords = keyWords.filter((keyWord) => keyWord !== keyWordToRemove);
      setKeyWords(updatedKeyWords);
    };

  return (
    <>
        <Navbar/>
        <div className="container">
            <div className="image-container">
                <img src={file} className="custom-image" alt=""/>
            </div>
            <div className="button-container">
                <label htmlFor="fileInput" className="custom-file-input-label">
                Subir Imagen
                </label>
                <input type="file" id="fileInput" onChange={handleChange} className="file-input" />
            </div>
        </div>
        <div className="input-container">
            <h1>Tags</h1>
            <div>
                <div>
                    {tags.map((tag, index) => (
                    <div key={index} className="tag-container">
                        <button onClick={() => handleRemoveTag(tag)} className="tag-button">
                        {tag} &#10005; {/* &#10005; es el símbolo 'x' para mostrarlo en el botón */}
                        </button>
                    </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Ingrese sus tags"
                    className="text-input first-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleTagInput}
                />
            </div>
            <h1>Título</h1>
            <input type="text" placeholder="Ingrese su título" className="text-input" 
                            name="title"
                            onChange={event=> setTitleMakeUp(event.target.value)}
                            required
            
            />
            <h1>Descripción</h1>
            <textarea
            placeholder="Ingrese su descripción"
            className="text-input"
            rows="9"  
            cols="80" 
            name="description"
            onChange={event=> setDescription(event.target.value)}
            required
            />
            <h1>Palabras Clave</h1>
            <div>
                <div>
                    {keyWords.map((keyWord, index) => (
                    <div key={index} className="tag-container">
                        <button onClick={() => handleRemoveKeyWord(keyWord)} className="tag-button">
                        {keyWord} &#10005; {/* &#10005; es el símbolo 'x' para mostrarlo en el botón */}
                        </button>
                    </div>
                    ))}
                </div>
                <input
                    type="text"
                    placeholder="Ingrese sus palabras clave"
                    className="text-input first-input"
                    value={inputKeyWordValue}
                    onChange={(e) => setInputKeyWordValue(e.target.value)}
                    onKeyPress={handleKeyWordInput}
                />
            </div>
                <h1>Categorías</h1>
                <div className="select-specific">
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            const selectedCategoryObject = categories.data.data.find(category => category._id === e.target.value);
                            if (selectedCategoryObject) {
                                setSelectedCategoryName(selectedCategoryObject.nameCategory);
                                setAssociatedSubCategories(selectedCategoryObject.subCategories);
                                setSelectedSubCategories([]);
                            } else {
                                setSelectedCategoryName('');
                                setSelectedSubCategories([]);
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
                <h1>Categoría elegida</h1>
                <input
                    type="text"
                    placeholder="Categoría Actual"
                    className="text-input first-input"
                    value={selectedCategoryName} 
                    onChange={(e) => setSelectedCategoryName(e.target.value)}
                    readOnly
                />
                <h1>Subcategorías</h1>
                <div className="select-specific">
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
                        <option key="" value="">SubCategoría</option>
                        {associatedSubCategories.map((subCategory) => (
                            <option key={subCategory._id} value={subCategory._id}>
                                {subCategory.nameSubCategory}
                            </option>
                        ))}
                    </select>
                    <h1>Subcategoría actuak</h1>
                    <input type="text" placeholder="Categoría Actual" className="text-input first-input" 
                        value={selectedSubCategoryName}
                        onChange={(e) => setSelectedSubCategoryName(e.target.value)} 
                        readOnly
                    />
                <Button
                onClickHandler={handleDeleteSelected}
                value="some-value"
                title="-"
                />
                <Button
                onClickHandler={handleSelected}
                value="some-value"
                title="+"
                />
            <h1>Subcategorías Seleccionadas:</h1>
            <select>
            {selectedSubCategories.map((subCategory) => (
              <option key={subCategory}>{subCategory}</option>
            ))}
          </select>
                </div>
        </div>
        <div className="button-container">
                    <Button
                        onClickHandler={handleSubmit}
                        value="some-value"
                        title="Crear Imagen"
                    />
        </div>
        <Footer />
    </>
  );
}

export default App;