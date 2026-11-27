export function validateForm(values) {
  console.log('Перевіряю значення:', values);
  const errors = {};
  const rating = Number(values.rating);
  if (values.rating.trim() === '') {
    errors.rating = 'Вкажіть оцінку';
  } else if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
    errors.rating = 'Вкажіть оцінку від 1 до 10';
  }
  if (values.note.trim() === '') {
    errors.note = 'Вкажіть коментар';
  } else if (values.note.length > 200) {
    errors.note = 'Не більше 200 символів';
  }
  console.log('Помилки:', errors);
  return errors;
}
