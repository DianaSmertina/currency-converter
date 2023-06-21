'use client';
import { ChangeEvent, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from '@/redux/store';
import { FormData, formReducer, selectFormData, setFormData } from '@/redux/slices/form';
import styles from './ConverterForm.module.scss';

const ConverterForm = () => {
  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldUnregister: false,
    defaultValues: {
      fromCurrency: formData.fromCurrency,
      amount: formData.amount,
      toCurrency: formData.toCurrency,
      result: formData.result,
    },
  });

  const myHandleSubmit: SubmitHandler<FormData> = (data) => {}; //TODO

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.name) {
      dispatch(setFormData({ [e.target.name]: e.target.value }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(myHandleSubmit)}>
      <div className={styles.currency_block}>
        <label className={styles.label}>
          From currency:
          <select
            {...register('fromCurrency', {
              required: true,
            })}
            onChange={(e) => handleChange(e)}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </label>
        <input
          type="number"
          {...register('amount', {
            required: true,
            validate: (value) => {
              if (value && value <= 0) {
                return 'Number must be greater than 0';
              }
              return true;
            },
          })}
          onChange={(e) => handleChange(e)}
        ></input>
        {errors.amount && <div>{errors.amount.message}</div>}
      </div>
      <div className={styles.currency_block}>
        <label className={styles.label}>
          To currency:
          <select
            {...register('toCurrency', {
              required: true,
            })}
            onChange={(e) => handleChange(e)}
          >
            <option value="option1">Option 1</option>
          </select>
        </label>
        <input
          type="number"
          {...register('result')}
          onChange={(e) => handleChange(e)}
          readOnly
        ></input>
      </div>
      <div className={styles.buttons_container}>
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" />
      </div>
    </form>
  );
};

export default ConverterForm;
