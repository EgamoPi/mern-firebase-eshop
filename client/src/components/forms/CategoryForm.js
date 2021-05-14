import { createElement as $ } from 'react'

const CategoryForm = ({ handleSubmit, name, setName }) =>
  $(
    'form',
    { onSubmit: handleSubmit },
    $(
      'div',
      { className: 'form-group' },
      $('label', null, 'Name'),
      $('input', {
        className: 'form-control',
        type: 'text',
        onChange: (e) => setName(e.target.value),
        value: name,
        autoFocus: true,
        required: true,
      }),
      $('br'),
      $('button', { className: 'btn btn-outline-primary' }, 'Save'),
    ),
  )

export default CategoryForm
