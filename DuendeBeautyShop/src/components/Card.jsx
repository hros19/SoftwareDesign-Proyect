const Card = ({img, title, category, subCategory, date, description, keyWords, tags }) => {
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">Título: {title}</h3>
          <section className="card-category">Categoría: {category}</section>
          <section className="card-sub-categories">Subcategorías: {subCategory}</section>
          <section className="card-sub-categories">Fecha: {date}</section>
          <section className="card-description">Descripción: {description}</section>
          <section className="card-keywords">Palabras Clave: {keyWords}</section>
          <section className="card-keywords">Tags: {tags}</section>
        </div>
      </section>
    </>
  );
};


export default Card;