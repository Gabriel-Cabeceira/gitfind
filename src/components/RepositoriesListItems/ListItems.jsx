import './listItems.css'

const ListItems = ({title, description}) => {
  return (
    <article className="repository-item">
      <h3 className="repository-name">{title}</h3>
      <p className='repository-description'>{description}</p>
      <hr />
    </article>
  )
}

export { ListItems };