import { createElement as $ } from 'react'

const LocalSearch = ({ setKeyword, keyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }
  return $(
    'div',
    { className: 'container p-4' },
    $('input', {
      type: 'search',
      placeholder: 'Filter',
      value: keyword,
      onChange: handleSearchChange,
      className: 'form-control mb-4',
    }),
  )
}

export default LocalSearch
