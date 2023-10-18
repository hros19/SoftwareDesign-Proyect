import Navbar from "./components/Navbar";
import "./css/index.css";
import Button from './components/Buttons';
import categoryService from './services/categoryService';
import subCategoryService from './services/subCategoryService';
import Footer from './components/Footer';
import React, { useState, useEffect} from "react";


function App() {
    const [nameCategory,setNameCategory] = useState('');

    const [categories, setCategories] = useState({});

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const [subCategories, setSubCategories] = useState({});

    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubCategoryName, setSelectedSubCategoryName] = useState('');

    
    const [secondSelectedSubCategory, setSecondSelectedSubCategory] = useState('');
    const [secondSelectedSubCategoryName, setSecondSelectedSubCategoryName] = useState('');

    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    const [associatedSubCategories, setAssociatedSubCategories] = useState([]);



    const fetchCategories = async()=>{
        setCategories(await categoryService.getCategories());
    }

    useEffect(()=>{
        fetchCategories();
    },[categories]);


    const fetchSubCategories = async()=>{
        setSubCategories(await subCategoryService.getSubCategories());
    }

    useEffect(()=>{
        fetchSubCategories();
    },[subCategories]);


    const handleNameCategoryChange = (event) => {
        setNameCategory(event.target.value);
    };

    const deleteCategory = async (id) => {
        const response = await categoryService.deleteCategory(id);
        if (response.data.success) {
          alert(response.data.msg);

          setSelectedCategory(''); // Restablece la selección del select
    
        } else {
          alert(response.data.msg);
        }
    };

    const deleteSubCategory = async (id) => {
        const response = await subCategoryService.deleteSubCategory(id);
        if (response.data.success) {
          alert(response.data.msg);

          setSelectedSubCategory(''); 
    
        } else {
          alert(response.data.msg);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('nameCategory', nameCategory);
        selectedSubCategories.forEach((subCategoryName, index) => {
            formData.append(`subCategories[${index}][nameSubCategory]`, subCategoryName);
        });
        try {
          const response = await categoryService.create(formData);
          if (response.data.success) {
            console.log('Post created successfully.');
          } else {
            console.log('Post Failed!');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          console.log('Post Failed!');
        }
      };

      const handleSubmitSub = async () => {
        const formData = new FormData();
        formData.append('nameSubCategory', selectedSubCategoryName);
        try {
          const response = await subCategoryService.create(formData);
          if (response.data.success) {
            console.log('Post created successfully.');
          } else {
            console.log('Post Failed!');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          console.log('Post Failed!');
        }
      };


      const handleSubmitSecondSub = async () => {
        const formData = new FormData();
        formData.append('nameSubCategory', secondSelectedSubCategoryName);
        try {
          const response = await subCategoryService.create(formData);
          if (response.data.success) {
            console.log('Post created successfully.');
          } else {
            console.log('Post Failed!');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          console.log('Post Failed!');
        }
      };


      const handleUpdate = async()=>{

        const formData = new FormData();

        formData.append('id',selectedCategory);
        formData.append('nameCategory',selectedCategoryName);

        const response = await categoryService.update(formData);
        if(response.data.success) {
            alert(response.data.msg);
        } else {
            alert(response.data.msg);
        }
    };

    const handleUpdateSub = async()=>{

        const formData = new FormData();

        formData.append('id',selectedSubCategory);
        formData.append('nameSubCategory',selectedSubCategoryName);

        const response = await subCategoryService.update(formData);
        if(response.data.success) {
            alert(response.data.msg);
        } else {
            alert(response.data.msg);
        }
    };

    const handleUpdateSecondSub = async()=>{

        const formData = new FormData();

        formData.append('id',secondSelectedSubCategory);
        formData.append('nameSubCategory',secondSelectedSubCategoryName);

        const response = await subCategoryService.update(formData);
        if(response.data.success) {
            alert(response.data.msg);
        } else {
            alert(response.data.msg);
        }
    };

    const handleSelected = () => {
        if (secondSelectedSubCategory) {
          // Check if the value is not already in the array before adding it
          if (!selectedSubCategories.includes(secondSelectedSubCategoryName)) {
            setSelectedSubCategories([...selectedSubCategories, secondSelectedSubCategoryName]);
          }
          setSecondSelectedSubCategory('');
        }
      };
      
      
      const handleDeleteSelected = () => {
        const updatedSubCategories = selectedSubCategories.filter((subCategory) => subCategory !== secondSelectedSubCategoryName);
        
        setSelectedSubCategories(updatedSubCategories);
      };
      
      const removeSubCategoryFromList = async() => {
        const updatedSubCategories = associatedSubCategories.filter(subCategory => subCategory._id !== selectedSubCategory);
        setAssociatedSubCategories(updatedSubCategories);
      
        const formData = new FormData();
        formData.append('id', selectedCategory);
        formData.append('nameCategory', selectedCategoryName);
        
        updatedSubCategories.forEach((subCategory, index) => {
          formData.append(`subCategories[${index}][nameSubCategory]`, subCategory.nameSubCategory);
        });
        
        try {
          const response = await categoryService.update(formData);
          if (response.data.success) {
            console.log('Post updated successfully.');
          } else {
            console.log('Post Failed!');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          console.log('Post Failed!');
        }
      };
      
      const addSubCategoryToList = async () => {
        const updatedSubCategories = [...associatedSubCategories];
      
        if (!updatedSubCategories.find(subCategory => subCategory.nameSubCategory === selectedSubCategoryName)) {
          updatedSubCategories.push({ nameSubCategory: selectedSubCategoryName });
        }
      
        setAssociatedSubCategories(updatedSubCategories);
      
        const formData = new FormData();
        formData.append('id', selectedCategory);
        formData.append('nameCategory', selectedCategoryName);
      
        updatedSubCategories.forEach((subCategory, index) => {
          formData.append(`subCategories[${index}][nameSubCategory]`, subCategory.nameSubCategory);
        });
        handleSubmitSub();
        try {
          const response = await categoryService.update(formData);
          if (response.data.success) {
            console.log('Post updated successfully.');
          } else {
            console.log('Post Failed!');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          console.log('Post Failed!');
        }
      };
      
      const modifySubCategoryInList = async () => {
        // Create a copy of the associated subcategories
        const updatedSubCategories = associatedSubCategories.map(subCategory => {
          if (subCategory._id === selectedSubCategory) {
            // Modify the selected subcategory
            subCategory.nameSubCategory = selectedSubCategoryName;
          }
          return subCategory;
        });
      
        setAssociatedSubCategories(updatedSubCategories); // Update the state with the modified array
      
        const formData = new FormData();
        formData.append('id', selectedCategory);
        formData.append('nameCategory', selectedCategoryName);
      
        // Loop through the updatedSubCategories array and append each subcategory individually
        updatedSubCategories.forEach((subCategory, index) => {
          formData.append(`subCategories[${index}][nameSubCategory]`, subCategory.nameSubCategory);
        });
        handleUpdateSub();
        handleSubmitSub();
        try {
          const response = await categoryService.update(formData);
          if (response.data.success) {
            console.log('Post updated successfully.');
          } else {
            console.log('Post Failed!');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          console.log('Post Failed!');
        }
      };

      
  return (
    <>
        <Navbar/>
        <h1 className="title-page">Administrar Categorías y Subcategorías</h1>
        <h1 className="second-title-page">Editar Categoría</h1>
        <div className="input-container">
            <h1>Categoría</h1>
            <div className="select-specific">
            <select
                    value={selectedCategory}
                    onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    // Find the selected category's name and set it to the state variable
                    const selectedCategoryObject = categories.data.data.find(category => category._id === e.target.value);
                    if (selectedCategoryObject) {
                        setSelectedCategoryName(selectedCategoryObject.nameCategory);
                        setAssociatedSubCategories(selectedCategoryObject.subCategories);
                    } else {
                        setSelectedCategoryName('');
                    }
                    }}
                >
                <option key="" value="">Categoría</option>
                {categories.data != undefined && categories.data.data.length > 0 && (
                    categories.data.data.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.nameCategory}
                    </option>
                    ))
                )}
                </select>

                <Button
                onClickHandler={() => {
                    if (selectedCategory) {
                        deleteCategory(selectedCategory);
                        setSelectedCategory(''); 
                      } else {
                        alert('Selecciona una categoría antes de eliminar.');
                      }
                }}
                value="some-value"
                title="-"
                />
            </div>
            <h1>Categoría actual</h1>
            <input
            type="text"
            placeholder="Categoría Actual"
            className="text-input first-input"
            value={selectedCategoryName} // Display the selected category name
            onChange={(e) => setSelectedCategoryName(e.target.value)} // Update the state when the input changes
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
                <Button
                onClickHandler={removeSubCategoryFromList}
                value="some-value"
                title="-"
                />
            <h1>Subcategoría actual</h1>
            <input type="text" placeholder="Categoría Actual" className="text-input first-input" 
                        value={selectedSubCategoryName}
                        onChange={(e) => setSelectedSubCategoryName(e.target.value)} 
            />
                <Button
                onClickHandler={addSubCategoryToList}
                value="some-value"
                title="+"
                />
                <Button
                onClickHandler={modifySubCategoryInList}
                value="some-value"
                title="?"
                />
            </div>
            <div className="button-container">
                    <Button
                    onClickHandler={() => {
                        if (selectedCategory) {
                            handleUpdate();
                            setSelectedCategory(''); 
                          } else {
                            alert('Selecciona una categoría antes de actualizar.');
                          }
                    }}
                    value="some-value"
                    title="Guardar Cambios"
                    />
            </div>
            
        </div>

        <h1 className="second-title-page">Nueva Categoría</h1>
        <div className="input-container">
            <h1>Nombre categoría</h1>
            <input type="text" placeholder="Categoría Actual" className="text-input first-input" 
                      value={nameCategory}
                      onChange={handleNameCategoryChange}
            />
            <h1>Subcategorías</h1>
            <div className="select-specific">
            <select
                    value={secondSelectedSubCategory}
                    onChange={(e) => {
                    setSecondSelectedSubCategory(e.target.value);
                    const secondSelectedSubCategoryObject = subCategories.data.data.find(subCategory => subCategory._id === e.target.value);
                    if (secondSelectedSubCategoryObject) {
                        setSecondSelectedSubCategoryName(secondSelectedSubCategoryObject.nameSubCategory);
                    } else {
                        setSecondSelectedSubCategoryName('');
                    }
                    }}
                >
                <option key="" value="">SubCategoría</option>
                {subCategories.data != undefined && subCategories.data.data.length > 0 && (
                    subCategories.data.data.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                        {subCategory.nameSubCategory}
                    </option>
                    ))
                )}
                </select>
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
            <h1>Subcategoría actual</h1>
            <input type="text" placeholder="Categoría Actual" className="text-input first-input" 
                        value={secondSelectedSubCategoryName} // Display the selected category name
                        onChange={(e) => setSecondSelectedSubCategoryName(e.target.value)} 
            />
                <Button
                onClickHandler={() => {
                    if (secondSelectedSubCategory) {
                        deleteSubCategory(secondSelectedSubCategory);
                        setSelectedSubCategory(''); 
                      } else {
                        alert('Selecciona una subcategoría antes de eliminar.');
                      }
                }}
                value="some-value"
                title="-"
                />
                <Button
                onClickHandler={handleSubmitSecondSub}
                value="some-value"
                title="+"
                />
                <Button
                onClickHandler={handleUpdateSecondSub}
                value="some-value"
                title="?"
                />
                <div>
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
                    title="Crear categoría"
                    />
            </div>
            
        </div>
        <Footer />
    </>
  );
}

export default App;