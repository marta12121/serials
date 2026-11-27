import { useState, useRef } from 'react';
import { validateForm } from '../utils/validateReview';
import { useFavorites } from '../context/FavoritesContext';

function ReviewForm({ serial }) {
  const { likeSerials, saveReview } = useFavorites();
  const ratingRef = useRef(null);
  const noteRef = useRef(null);
  const savedSerial = likeSerials.find((item) => item.id === serial.id);
  const [values, setValues] = useState(() => ({
    rating: savedSerial?.review?.rating.toString() ?? '',
    reviewed: savedSerial?.review?.reviewed ?? false,
    note: savedSerial?.review?.note ?? '',
  }));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const errors = isSubmitted ? validateForm(values) : {};

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values);
    setIsSubmitted(true);
    if (validationErrors.rating) {
      ratingRef.current.focus();
    } else if (validationErrors.note) {
      noteRef.current.focus();
    }
    if (Object.keys(validationErrors).length === 0) {
      saveReview(serial, { ...values, rating: Number(values.rating) });
    }
  }
  function handleCancel() {
    setValues({
      rating: savedSerial?.review?.rating.toString() ?? '',
      reviewed: savedSerial?.review?.reviewed ?? false,
      note: savedSerial?.review?.note ?? '',
    });
    setIsSubmitted(false);
  }
  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <h2 className="review-form__title">Мій відгук</h2>
      <label className="review-form__label" htmlFor="rating">
        Оцінка (1-10)
      </label>
      <input
        className="review-form__input"
        type="number"
        min="1"
        max="10"
        step="1"
        id="rating"
        name="rating"
        value={values.rating}
        onChange={handleChange}
        aria-invalid={Boolean(errors.rating)}
        ref={ratingRef}
      />
      {errors.rating && (
        <span className="review-form__error">{errors.rating}</span>
      )}
      <div className="row">
        <label className="review-form__label" htmlFor="reviewed">
          Переглянуто
        </label>

        <input
          className="review-form__checkbox"
          type="checkbox"
          name="reviewed"
          id="reviewed"
          checked={values.reviewed}
          onChange={handleChange}
        />
      </div>
      <label className="review-form__label" htmlFor="note">
        Коментар
      </label>
      <textarea
        className="review-form__textarea"
        name="note"
        id="note"
        maxLength={200}
        value={values.note}
        onChange={handleChange}
        aria-invalid={Boolean(errors.note)}
        ref={noteRef}
      ></textarea>
      <span className="review-form__counter">{values.note.length}/200</span>
      {errors.note && <span className="review-form__error">{errors.note}</span>}
      <div className="row">
        <button
          type="submit"
          className="review-form__button review-form__button--submit"
        >
          Зберегти
        </button>
        <button
          type="button"
          className="review-form__button review-form__button--cancel"
          onClick={handleCancel}
        >
          Скасувати
        </button>
      </div>
    </form>
  );
}
export default ReviewForm;
