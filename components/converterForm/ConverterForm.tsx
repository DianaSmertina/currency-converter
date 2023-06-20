'use client';
import styles from './ConverterForm.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

const ConverterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  return (
    <form className={styles.form}>
      <div className={styles.currency_block}>
        <label className={styles.label}>
          From currency:
          <select
            {...register('fromCurrency', {
              required: true,
            })}
          >
            <option value="option1">Option 1</option>
          </select>
        </label>
        <input
          type="number"
          {...register('amount', {
            required: true,
          })}
        ></input>
      </div>
      <div className={styles.currency_block}>
        <label className={styles.label}>
          To currency:
          <select
            {...register('toCurrency', {
              required: true,
            })}
          >
            <option value="option1">Option 1</option>
          </select>
        </label>
        <input type="number" {...register('amount')} readOnly></input>
      </div>
      <div className={styles.buttons_container}>
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" />
      </div>
    </form>
  );
};

export default ConverterForm;
